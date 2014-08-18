---
layout: post
title: Close GitHub Issue With Commit Message
date: 2014-08-18 18:00:00
categories:
- git
tags:
- git

---

Did you know you can close a GitHub issue with a commit message?  I didn't know that either, until recently.  It's turned out to be a pretty handy feature. 

{% highlight vim script %}

git commit -m 'closes #13'

{% endhighlight %}

You don't have to be closing an issue to mention it in a commit.  There are several keywords you can use to reference issues; `started`, `continued` or `closes` are the main keywords.  You can view the [GitHub Blog][gitblog] for a little more information on the issue.

I tend to create an issue for everything I want to change with my site, so I tend to have a lot of open issues.  Being able to close issues witha commit message makes it super easy to keep track of what I've done work on, what I'm working on, and what I've finished working on.

####References
- [GitHub Blog][gitblog]

[gitblog]: https://github.com/blog/1386-closing-issues-via-commit-messages