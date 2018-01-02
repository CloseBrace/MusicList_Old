# MusicList
A website for tracking music and albums

This is an ongoing tutorial series from [CloseBrace](https://closebrace.com), a website for JavaScript developers, by JavaScript developers. In this tutorial series, you will learn how to create a Node.js-based API and talk to it with a React.js-based front-end, all in simple five-minute bites. All tutorials have both full video and full-text versions, so you can choose whichever works better for you. Please visit the [series index](https://closebrace.com/categories/five-minute-react) for a list of all tutorials.

Note that currently, each new tutorial gets its own commit, so it's possible to step back and forth through the tutorial by changing what revision you're currently on in git. I like to do this by checking out to a temporary branch. If you don't know how to do that, I suggest checking out [this StackOverflow answer](https://stackoverflow.com/questions/5658302/checking-out-an-old-commit-and-maintaining-the-head-on-the-master-branch).

**Please Note:** as of Tutorial #63, this repo cannot simply be run after cloning. It requires the creation of a file at the top level called `config.json`, which is used to keep API keys and similar out of version control. You can learn how to create this file by following Tutorial #63, but here's an example of what it should look like. You'll of course have to use your own API Keys and secrets.

```
{
  "crypto": {
    "secret": "sda46ufgh239d7fjhwi0sejhrgw4ersjdf8u7eweoi42hg0siojg"
  },
  "expressSession" : {
    "secret": "bmoe5r8hb98fhsbso93ikdfgbs0u4sfg89dhsogsd09fy4pf9fdh"
  },
  "mailgun": {
    "apiKey": "key-a6831fad9c681569479ab46734f662a8",
    "domain": "sandboxfa58bac976052d5e93f1cfa0b54c5337.mailgun.org"
  }
}
```

**Note 2:** This tutorial series is finished, in terms of coding. Please check the index for tutorials on optimization and deployment!