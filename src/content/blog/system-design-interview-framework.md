---
title: "How I Approach System Design Interviews: A Framework That Actually Works"
description: "I'm sharing the exact framework I use to tackle system design interviews. We'll walk through designing a URL shortener together, covering everything from requirements to scaling strategies."
pubDate: 2026-01-06
tags: ["system-design", "interviews", "architecture", "scaling", "backend"]
draft: false
---

Hey there! If you're reading this, chances are you've got a system design interview coming up and you're feeling a bit nervous about it. I totally get it—I've been there.

System design interviews can feel overwhelming. Unlike coding interviews where you're writing actual code, here you're expected to architect entire systems on a whiteboard while explaining your thinking out loud. The worst part? The questions are so open-ended that you're often left wondering, "Wait, where do I even start?"

I want to share the framework that helped me get through these interviews without panicking. We're going to walk through this together using a URL shortener (like bit.ly) as our example. By the end of this post, you'll have a repeatable approach you can use for any system design problem.

## Why Am I Using URL Shortener as an Example?

Great question! I picked URL shorteners because:
- **Everyone gets them** - we've all used short links
- **They look simple** - but actually involve some really cool technical challenges
- **Interviewers love them** - seriously, this question comes up all the time
- **They cover the basics** - touching on most concepts you'll need

## My Framework: RUDE-CAT

I know, weird name right? But it's stuck with me because it's easy to remember. Here's what it stands for:

1. **R**equirements - What are we actually building?
2. **U**sage Estimates - How much traffic are we talking about?
3. **D**ata Model & API Design - What do our interfaces look like?
4. **E**ntity Relationships & Storage - How do we store this stuff?
5. **C**omponent Design - What does the architecture look like?
6. **A**dvanced Topics - How do we make it fast and reliable?
7. **T**rade-offs & Bottlenecks - What could go wrong?

Let me walk you through each step.

---

## Step 1: Requirements (Spend ~15% of your time here)

Here's my first big tip: **Never jump straight into designing**. I've made this mistake before, and trust me, it doesn't go well. Always start by clarifying what you're building.

### What Should It Actually Do?

For our URL shortener, I'd ask these questions:

1. Can users turn long URLs into short ones? (obviously yes)
2. When someone clicks a short link, do we redirect them? (yep)
3. Can users pick custom short URLs? (maybe - ask the interviewer!)
4. Do we need analytics? Click counts, locations, that sort of thing? (nice to have)
5. Should links expire after some time? (let's discuss)

**Pro tip from experience:** Start with the core features (1-2), then bring up the optional ones based on how much time you have.

### How Should It Perform?

This is where I talk about the "ilities" - availability, reliability, scalability, you know the drill.

For a URL shortener, here's what I care about:
- **High availability** (99.9% uptime) - dead links look really bad
- **Low latency** (under 100ms for redirects) - nobody waits for redirects
- **Scalability** - needs to handle millions of URLs and billions of clicks
- **Durability** - once I create a link, it shouldn't disappear

**Here's something I learned:** For this system, availability and speed matter way more than perfect consistency. If your analytics are slightly delayed by a few seconds, that's totally fine. But if the redirect is slow or the service is down? That's a problem.

---

## Step 2: Usage Estimates (Spend ~10% of your time here)

Okay, this is where we do some quick math. Don't overthink it—rough estimates are fine. I promise your interviewer isn't checking your arithmetic with a calculator.

### Let's Estimate the Scale

Here's what I'd assume:
- 100 million new URLs created per month
- 100:1 read-to-write ratio (way more redirects than new URLs)
- URLs are stored forever (we can discuss deletion later)

**Quick calculations:**

```
New URLs (writes):
- 100M URLs/month
- That's roughly 40 URLs/second
- At peak: maybe 120 URLs/second (I usually assume 3x)

Redirects (reads):
- 100:1 ratio means 10 billion redirects/month
- That's about 4,000 redirects/second
- Peak: around 12,000 redirects/second
```

### How Much Storage Do We Need?

```
Each URL entry needs:
- Short code: 7 bytes
- Original URL: ~500 bytes (being generous)
- Metadata: ~100 bytes (timestamps, user info, etc.)
- Total: roughly 600 bytes per URL

So for storage:
- Year 1: 100M × 12 months × 600 bytes = 720 GB
- Year 5: about 3.6 TB
- With replication (let's say 3 copies): ~11 TB total

For caching (remember that 80/20 rule?):
- Cache top 20% of URLs: ~200 GB per year
```

**My advice:** Don't stress about exact numbers. Show that you can think about scale. Round liberally, use powers of 10, and keep moving forward.

---

## Step 3: Data Model & API Design (Spend ~15% of your time here)

Now let's talk about what our APIs look like. I like to keep things simple and RESTful.

### The APIs I'd Design

```
1. Create a short URL
POST /api/v1/urls
{
  "long_url": "https://example.com/very/long/path",
  "custom_alias": "my-link",  // optional
  "expiry_date": "2026-12-31" // optional
}

Response:
{
  "short_url": "https://short.ly/abc123",
  "long_url": "https://example.com/very/long/path",
  "created_at": "2026-01-06T10:00:00Z"
}

2. Redirect (this is the important one!)
GET /:shortCode
→ Returns 302 redirect to the long URL

3. Get analytics (if we're doing this)
GET /api/v1/urls/:shortCode/stats
{
  "short_url": "https://short.ly/abc123",
  "total_clicks": 1523,
  "clicks_by_date": [...],
  "top_locations": [...]
}

4. Delete a URL
DELETE /api/v1/urls/:shortCode
```

### How I'd Structure the Database

```sql
-- Main table for our URLs
CREATE TABLE urls (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  long_url TEXT NOT NULL,
  user_id BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,

  INDEX idx_short_code (short_code),
  INDEX idx_user_id (user_id)
);

-- Separate table for analytics (keeps things cleaner)
CREATE TABLE clicks (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(10) NOT NULL,
  clicked_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(2),

  INDEX idx_short_code (short_code),
  INDEX idx_clicked_at (clicked_at)
);
```

**Why I designed it this way:**
- `short_code` is VARCHAR(10) because that gives us 62^10 possible combinations (plenty!)
- Separate `clicks` table so analytics don't slow down our main redirects
- Indexes on `short_code` for lightning-fast lookups

---

## Step 4: Choosing the Right Database (Spend ~10% of your time here)

### My Take on Database Selection

**For storing URLs, I'd start with PostgreSQL:**
- ACID guarantees (no data loss!)
- Great indexing for fast lookups
- Can handle joins if we need analytics
- Battle-tested and reliable

**But if scale gets crazy (like 10K+ writes/second), I'd consider NoSQL:**
- Something like Cassandra or DynamoDB
- Better horizontal scaling
- Eventually consistent (which is fine for us)
- Perfect for key-value lookups

**My recommendation:** Start with Postgres. It's simpler, and you can always move to NoSQL later if you need to.

### How Would I Shard This?

When a single database can't handle the load, here are my options:

```
Option 1: Hash-based sharding
- shard_id = hash(short_code) % num_shards
- ✅ Even distribution of data
- ❌ Hard to add more shards later

Option 2: Range-based sharding
- Shard by creation date
- ✅ Easy to add new shards
- ❌ New shards get all the writes (uneven)

Option 3: Geographic sharding
- Shard by user location
- ✅ Data locality
- ❌ Uneven distribution
```

**What I'd pick:** Hash-based sharding on `short_code` for even distribution.

---

## Step 5: Component Design (This is the Big One - Spend ~30% of your time here)

Alright, this is where we draw the architecture. Let me show you how I'd design this system.

### My High-Level Architecture

```
                    Users
                      |
                      ↓
            ┌─────────────────┐
            │  Load Balancer  │
            │  (CloudFlare)   │
            └────────┬────────┘
                     |
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    ┌────────┐  ┌────────┐  ┌────────┐
    │  Web   │  │  Web   │  │  Web   │
    │ Server │  │ Server │  │ Server │
    └───┬────┘  └───┬────┘  └───┬────┘
        └───────────┼───────────┘
                    ↓
            ┌───────────────┐
            │  App Servers  │
            │  (API Layer)  │
            └───────┬───────┘
                    |
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    ┌────────┐  ┌─────────┐  ┌──────────┐
    │ Redis  │  │Postgres │  │ Analytics│
    │ Cache  │  │   DB    │  │  Queue   │
    └────────┘  └─────────┘  └──────────┘
```

### What Each Component Does

**Load Balancer:**
- Spreads traffic across web servers
- Checks if servers are healthy
- Handles SSL termination
- Protects against DDoS attacks

**Web Servers (stateless is key!):**
- Handle incoming HTTP requests
- Route to the right API endpoints
- Serve any static content

**App Servers:**
- This is where the magic happens
- Generate short codes
- Validate URLs
- Talk to the database

**Redis Cache:**
- Cache the hot URLs (remember 80/20 rule?)
- Keep stuff for 24 hours
- Reduces database load by 80%+

**PostgreSQL:**
- Stores everything
- Master for writes, replicas for reads
- Master-slave replication

**Analytics Queue:**
- Process clicks asynchronously
- Don't block the redirect!
- Batch writes to analytics DB

---

## Step 6: Advanced Topics (Spend ~15% of your time here)

Now let's talk about the interesting stuff that makes this system really work.

### How Do We Generate Short Codes?

This is one of my favorite parts! I've seen three main approaches:

**Approach 1: Hashing**
```python
def generate_short_code(long_url):
    # Hash the URL
    hash_value = md5(long_url).hexdigest()

    # Take first 7 characters, convert to base62
    short_code = base62_encode(hash_value[:7])

    # Handle collisions if needed
    if exists_in_db(short_code):
        short_code = handle_collision(short_code)

    return short_code
```
✅ Same URL always gets same short code
❌ Need collision handling

**Approach 2: Counter (my favorite!)**
```python
def generate_short_code():
    # Get next counter from distributed service
    counter = get_next_counter()

    # Convert to base62
    short_code = base62_encode(counter)

    return short_code
```
✅ No collisions ever
❌ Predictable (sequential)

**Approach 3: Random**
```python
def generate_short_code():
    while True:
        short_code = random_base62(7)

        if not exists_in_db(short_code):
            return short_code
```
✅ Unpredictable and simple
❌ Might need multiple DB checks

**What I'd use:** Approach 2 (counter-based) with ZooKeeper or Redis to manage counters across servers.

### My Caching Strategy

Here's how I'd implement caching:

```
When a redirect request comes in:

1. Check Redis first (key: short_code, value: long_url)
2. Cache HIT?
   - Return the URL immediately
   - Log analytics asynchronously
3. Cache MISS?
   - Query the database
   - Store in Redis with 24-hour TTL
   - Return the URL

Eviction: LRU (kick out least recently used)
Size: ~200 GB (stores about 300M URLs)
Expected hit rate: ~85%
```

This dramatically reduces database load. Most requests never touch the database!

### Handling Analytics Without Slowing Down Redirects

Here's a big one—we don't want analytics to block redirects:

```
My approach:

1. User visits short URL
2. Immediately redirect (don't wait!)
3. Fire event to message queue (Kafka/RabbitMQ)
4. Worker processes batch events
5. Batch insert to analytics DB

Result:
- Redirect latency: <50ms
- Can aggregate before writing
- Can replay if analytics DB fails
```

### Preventing Abuse

I'd add rate limiting:

```
Using Redis + Token Bucket:

if redis.get(ip + ':minute') > 100:
    return 429 Too Many Requests
else:
    redis.incr(ip + ':minute')
    redis.expire(ip + ':minute', 60)
```

Simple but effective!

---

## Step 7: Trade-offs & Bottlenecks (Spend ~5% of your time here)

Let's wrap up by discussing what could go wrong.

### Potential Bottlenecks I'd Watch Out For

1. **Database writes at massive scale**
   → Solution: Shard the database, consider NoSQL

2. **Counter service becomes single point of failure**
   → Solution: Pre-allocate ranges to each server

3. **Hot URLs overwhelming the cache**
   → Solution: Add CDN layer, multiple cache replicas

4. **High latency for global users**
   → Solution: Multi-region deployment

### Trade-offs I Made

| Decision | Trade-off |
|----------|-----------|
| Eventually consistent analytics | Fast redirects vs. real-time accuracy |
| 7-character short codes | 3.5 trillion URLs vs. shorter codes |
| PostgreSQL over NoSQL | Simplicity vs. extreme write throughput |
| Cache-aside pattern | Some cache misses vs. complexity |

---

## Common Mistakes I've Seen (and Made!)

1. **Jumping to solutions** without asking questions first
2. **Over-engineering** for scale you don't need yet
3. **Ignoring failure modes** - what if the DB goes down?
4. **Forgetting to estimate** scale and capacity
5. **Not explaining trade-offs** - always explain why you chose something
6. **Drawing boxes** without explaining what they do

---

## My Interview Timeline

For a 45-minute interview, here's how I'd budget my time:

- **0-7 min:** Requirements & clarifications
- **7-12 min:** Capacity estimates
- **12-20 min:** API design & data model
- **20-35 min:** Architecture & components
- **35-40 min:** Deep dive (caching, encoding, scaling)
- **40-45 min:** Trade-offs & Q&A

**Always** leave time for questions at the end!

---

## Using This Framework for Other Problems

The beauty of RUDE-CAT is that it works for everything:

- **Design Instagram?** Focus on image storage, feed generation
- **Design Netflix?** Emphasize video encoding, CDN strategy
- **Design Uber?** Highlight geo-spatial indexing, matching algorithms
- **Design WhatsApp?** Prioritize WebSockets, message queues

The steps stay the same. Just the details change.

---

## Final Thoughts

Look, I'll be honest with you—there's no perfect answer in system design interviews. Interviewers aren't looking for a textbook solution. They want to see how you think, how you handle trade-offs, and how you communicate complex ideas.

The framework I shared here has helped me stay calm and organized during interviews. It gives me a roadmap when I feel lost.

My advice? Practice with this framework on different problems. Draw the diagrams. Explain your thinking out loud. Time yourself. The more you practice, the more natural it becomes.

You've got this! And if you found this helpful, I'd love to hear about it. Feel free to reach out on [Twitter](https://twitter.com/anudeepsamaiya) or [LinkedIn](https://www.linkedin.com/in/anudeepsamaiya/). I'm always happy to chat about system design or interview prep.

Good luck with your interviews! 🚀

---

## Resources That Helped Me

**Books I recommend:**
- "Designing Data-Intensive Applications" by Martin Kleppmann (this one's gold!)
- "System Design Interview" by Alex Xu (great for interview prep)

**Websites that helped:**
- [System Design Primer on GitHub](https://github.com/donnemartin/system-design-primer)
- [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)

**Practice platforms:**
- [LeetCode System Design](https://leetcode.com/discuss/interview-question/system-design)
- [Pramp](https://www.pramp.com/) for mock interviews with peers

---

*Working on a system design problem? Stuck somewhere? Drop me a comment or reach out—I'd love to help!*
