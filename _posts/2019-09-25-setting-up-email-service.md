---
layout: post
title: Setting up our own service for handling emails
ref: setting-up-email-service
date: 2019-09-25
lang: en
orig-lang: en
author: tilmann
---

We used to use the commercial SparkPost ESP (email service provider) to send and receive emails for karrot.world. Recently, SparkPost decided to cut down their free account from 100.000 to 500 emails/month - not enough for us. 

<!--more-->

Handling emails seems an important but sensitive topic. I used to encounter statements like "do not run your own mail server" and so far, I was quite happy to follow this advice. But by now, seeing that email sending gets more and more "oligopolized" (like a monopol, but with a few big players) and free offers are getting more and more restricted, I became interested in handling this vital part of web applications myself.

## Postal

My research led me to [Postal](https://github.com/atech/postal), a "fully featured open source mail delivery platform". Although its recent contributions are fairly low and issue count is high, it left a good enough impression to give it a try.

## Postal docker-compose setup

Luckily, there's also a [third-party docker-compose setup](https://github.com/CatDeployed/docker-postal) available that simplifies running all the necessary things - Ruby-on-Rails, MySQL and RabbitMQ. I chose the `alpine` version mostly because it was marked as default in the README file, but also because I generally like alpine linux.

```sh
git clone https://github.com/CatDeployed/docker-postal
cd docker-postal
```

## Postal DNS configuration

Now I edited the `dns` section in `src/templates/postal.exammple.yml`:

```yaml
...
dns:
  # Specifies the DNS record that you have configured. Refer to the documentation at
  # https://github.com/atech/postal/wiki/Domains-&-DNS-Configuration for further
  # information about these.
  mx_records:
    - mx.postal.karrot.world
  smtp_server_hostname: postal.karrot.world
  spf_include: spf.postal.karrot.world
  return_path: rp.postal.karrot.world
  route_domain: routes.postal.karrot.world
  track_domain: track.postal.karrot.world
  helo_domain: yuca.yunity.org
...
```

I added the `helo_domain` setting to match the [Reverse DNS](https://en.wikipedia.org/wiki/Reverse_DNS_lookup) lookup for `postal.karrot.world`. A simple way to find out the correct domain:

```sh
$ dig +noall +answer postal.karrot.world
postal.karrot.world.	1726	IN	A	89.238.64.138

$ dig +noall +answer -x 89.238.64.138
138.64.238.89.in-addr.arpa. 86392 IN	PTR	yuca.yunity.org.
```

The [wiki page on DNS configuration](https://github.com/atech/postal/wiki/Domains-&-DNS-Configuration) gave me all information I needed:

```
postal.karrot.world.         IN    A    89.238.64.138
postal.karrot.world.         IN    AAAA 2a00:1828:2000:664::2
spf.postal.karrot.world.     IN    TXT   "v=spf1 ip4:89.238.64.138/32 ip6:2a00:1828:2000:664::2/64 ~all"
rp.postal.karrot.world.      IN    A     89.238.64.138
rp.postal.karrot.world.      IN    AAAA  2a00:1828:2000:664::2
rp.postal.karrot.world.      IN    MX    10 postal.karrot.world
rp.postal.karrot.world.      IN    TXT   "v=spf1 a mx include:spf.postal.karrot.world ~all"
postal._domainkey.rp.postal.karrot.world.      IN    TXT v=DKIM1; t=s; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXnPQvaIqgtlUn/bfGX/4rhhuWohuw5j0rqlgFvU2ANDBhsRzoQEabJ1bLAIOP63sWbgIGxvb9xRcorSm16kmBTWHSemsYkHQ/ib71trtMDvhyqW+HdiG5krHeok/LIdLKhl3/aGEsxO+WjMjHKoKBbBnuwkVC4cXK3oTPSfTFtwIDAQAB;
routes.postal.karrot.world.  IN     MX    mx.postal.karrot.world
```

I entered this information in our Namecheap Advanced DNS panel. More DNS entries will follow later, when adding a new sending domain in the Postal web interface.


## SMTP server configuration

By default, the SMTP server only listens on localhost. I changed that in `docker-compose.yml` to listen on all devices: 

```yaml
services:
  postal:
    ...
    ports:
      - 0.0.0.0:25:25
    ...
```

I also allowed incoming SMTP connections in the `ufw` firewall:

```sh
ufw allow from any to any port 25
```

On this server, there was already a `postfix` daemon running for internal emails. I disabled its SMTP part by commenting out this line in `/etc/postfix/master.cf`:

```
#smtp inet n - y - - smtpd
```

and running

```sh
postfix reload
```

## Initialize and run Postal

Now I can use the commands given in the `docker-postal` [README](https://github.com/CatDeployed/docker-postal) to configure and start the containers:

```sh
docker-compose run postal initialize
docker-compose run postal make-user
docker-compose up -d
```

## Using the Postal web interface

### General and outbound configuration

First, we have to create a new organization. It's just a name, choose any!

![](/images/2019-09-25-postal/1organization.png)

Then, we should create a mail server. It's also just a name, but make sure to create one mail server per app instance. Postal handles all messages and tracking information _per mail server_.

![](/images/2019-09-25-postal/2mailserver.png)

Once you have a mail server, create one or more sending domains. This is also necessary to receive emails (more on that later).

![](/images/2019-09-25-postal/3domain.png)

Now Postal presents you with information how to configure the DNS settings of your domain. Why another DNS configuration? Postal is made in a way that postal.example.com can handle mails for yourdomain.com - hence there is the _instance DNS configuration_ for postal.example.com and the _mail server DNS configuration_ for yourdomain.com. It's a bit more confusing in our case, as we run both on the karrot.world domain.

![](/images/2019-09-25-postal/4dns.png)

Now you can create a webhook that receives tracking information about sent or bounced emails.

![](/images/2019-09-25-postal/7trackingwebhook.png)

Finally, let's create the API key that we use in our application to send emails.

![](/images/2019-09-25-postal/8apikey.png)

### Inbound configuration

For receiving emails, make sure to create an inbound route and inbound webhook. We use a subdomain for receiving replies, therefore I created a second domain `replies.karrot.world`.

![](/images/2019-09-25-postal/5inbound.png)

I use `django-anymail` to talk with Postal, and it expects the raw message as JSON format. We can define these settings in the HTTP endpoint: 

![](/images/2019-09-25-postal/6inboundwebhook.png)


## Hotfix: Postal doesn't handle UTF8 in subject

MySQL has a known problem that the default UTF8 charset doesn't support 4-byte codepoints. Some emojis fall into this range, which is how I noticed the problem. Other people already [proposed a fix](https://github.com/atech/postal/pull/391) for this, but unfortunately it didn't get merged so far. I took a shortcut and just fixed in manually in the database.

```
root@yuca:/home/postal/docker-postal/alpine# docker-compose exec mysql /bin/bash
root@d241907e2559:/# mysql -uroot -p
Enter password: (type in password you set in docker-compose.yml; default is 'changeme')
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3343
Server version: 10.4.7-MariaDB-1:10.4.7+maria~bionic mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use postal-server-1;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [postal-server-1]> alter database `postal-server-1` character set utf8mb4 collate utf8mb4_unicode_ci;
MariaDB [postal-server-1]> alter table messages convert to character set utf8mb4 collate utf8mb4_unicode_ci;
```

You need to do this for every `Mail Server` you configured in Postal.

Of course this should be fixed in Postal.

## Adapt django-anymail for Postal

[django-anymail](https://github.com/anymail/django-anymail) is a great library to talk with various ESPs. Unfortunately, Postal is not supported yet. I started working on [a implementation](https://github.com/anymail/django-anymail/pull/166), which works for karrot.world, but needs to be improved before it can be merged.

Right now, it needs these configuration parameters:
```py
EMAIL_BACKEND = 'anymail.backends.postal.EmailBackend'
ANYMAIL = {
    'POSTAL_API_URL': 'https://postal.karrot.world',
    'POSTAL_API_KEY': '<secrect>',
    'POSTAL_WEBHOOK_KEY': '<public key of Postal instance DKIM',
}
```

`POSTAL_WEBHOOK_KEY` is used to verify webhook message signature. Postal signs webhook messages with the same private key as DKIM, hence we can use the DKIM public key for verification.

## Upgrading Postal

I thought I would be able to upgrade Postal by running `docker-compose run postal auto-upgrade`, but it fails for various reasons. In fact, the [docker-postal README](https://github.com/CatDeployed/docker-postal) discourages from doing that.

Instead, we should pull a new version of the container (they get [frequently updated](https://hub.docker.com/r/catdeployed/postal/tags)) and run `docker-compose run postal upgrade` afterwards to execute any pending database migrations. I didn't try that yet.

## Concerns about Postal

While setting up Postal, I noticed some things that made me a bit concerned about its quality:

- out-of-band bounce handling relies on a special header field which only seems to work sometimes. [VERP](https://en.wikipedia.org/wiki/Variable_envelope_return_path) should the way to go!
- the built-in suppression list [doesn't clear after 30 days](https://github.com/atech/postal/pull/867). It's also confusing that sending to a suppressed address only generates a `Held` status, not a `SoftFail` or something better
- there's no handling for feedback loop emails. [This issue](https://github.com/atech/postal/issues/102) didn't see much attention yet.
- there's no way in UI to see emails coming in from the return path, e.g. out-of-band bounces and feedback loop
- email subject is set to `VARCHAR(255)`, which seems like an arbitrary limitation. Subjects can be almost [1000 lines](https://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit) long (or unlimited even)

## Test email sending

I found [mail-tester.com](https://www.mail-tester.com/) useful to check if SPF and DKIM settings are valid. We can use it 3 times, then they want payment. Luckily, we can also use other websites to check if we are on any IP blacklist, for example [mxtoolbox.com](https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a89.238.64.138&run=toolpage).

## Not everybody likes my emails...

In the first days after rolling out the new configuration, I kept a close eye on outgoing emails. I noticed these things:

- sbcglobal.net responds with `553 5.3.0 alpd682 DNSBL:ATTRBL 521< 89.238.64.138 >_is_blocked. For assistance forward this email to abuse_rbl@abuse-att.net`. After writing a nice emails to them, they removed me from the blacklist.
- Yahoo frequently uses temporary bans like these `421 4.7.0 [TSS04] Messages from 89.238.64.138 temporarily deferred due to user complaints - 4.16.55.1; see https://help.yahoo.com/kb/postmaster/SLN3434.html`. I registered with their [Complaint Feedback Loop program](https://help.yahoo.com/kb/postmaster/SLN3438.html), but didn't receive any report yet.
- one university sometimes rejects emails with `554 5.7.1 Message rejected because of unacceptable content..`

Other than that, delivering emails work just fine!

## Conclusion

It was a bumpy ride to get it set up, but I'm quite happy with our new independence. There's still a lot to do: finalize the anymail Pull Request, fix the UTF8MB4 bug, extend [our ansible config](https://github.com/yunity/yuca). My hope is other projects can easily use Postal instead of relying on commercial ESPs.

## Alternatives

As far as I know, there's no comparable open source project out there.

I looked at [ZoneMTA](https://github.com/zone-eu/zone-mta), [Haraka](https://haraka.github.io/) and [mailcow](https://mailcow.email/), but they all have different scopes.
ZoneMTA is the only one of them that offers a HTTP API for sending emails, but it doesn't support receiving them.
