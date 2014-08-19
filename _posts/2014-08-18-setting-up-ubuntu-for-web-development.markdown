---
layout: post
title: Setting up Ubunutu for Web Development 
date: 2014-08-18 20:44:23
categories:
- linux 
tags:
- linux
- ubuntu
- git
- ruby
- rails
- nodejs

---

This article assumes you have already installed Ubuntu, whether it's as a virutal machine or as a stand-alone system, there are a few things that you need to install and setup to get your web development enviroment up and running.  The following procedures are steps I've put together and tested with multiple Ubunutu setups both virtual and standalone.

---

###Prepare the System
The very first thing you should do immediately after completing the installation process is updating and upgrading your Ubuntu distribution.

{% highlight vim script %}
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get dist-upgrade
{% endhighlight %}

This could take a little while.  There are usually a lot of things that need updating after installing Ubunutu.  After you have finished with the updates and upgrades, run the following commands to clean things up:

{% highlight vim script %}
$ sudo apt-get autoclean
$ sudo apt-get clean
{% endhighlight %}

Last thing before we restart.  Open up a terminal window.  Click on `Edit` then select `Profile Preferences`.  Click on the `Title & Command tab` and then check the `run as command login shell` checkbox.  Close the terminal and reopen a new one.

Both of those commands will clean out any 'fluff' that remains such as partial packages and the apt cache.

---

###For Virtual Machines
If you are running a virtual machine, it's at this point you would install [Virtualbox][virtualbox] guest additions or [VMWare][vmware] Tools.  If you are running a standalone system, you can skip this section and move along to step three.

######VMWare Tools
{% highlight vim script %}
$ sudo apt-get install open-vm-tools open-vm-dkms 
{% endhighlight %}

######Virtualbox Guest Additions
{% highlight vim script %}
$ sudo apt-get install dkms virtualbox-guest-additions
{% endhighlight %}

Many other tutorials will suggest doing this a different way, but I've found this is the easiest and quickest way.

After you have finished installing the guest additions or VMWare tools, now would be a good time to restart.

---

###Servers and Major Packages
Since our aim is web development, we're going to need Google Chrome and Firefox.

{% highlight vim script %}
$ sudo apt-get install chromium-browser firefox
{% endhighlight %}

It's at this point I usually install Docky.  Docky is a Linux version of Apple's app dock.  I've found Docky to be indispensable and makes me feel so much more productive.  All the apps I need are right there waiting for me.

{% highlight vim script %}
$ sudo apt-get install docky
{% endhighlight %}

You could also install Docky via the Ubuntu Softawre center.

The next app we're going to install we'll have to get through the software center.  Open up `Ubuntu Software Center` and do a search for `Terminator`.  [Terminator][terminator] is a souped terminal that allows multiple windows to be tiled in the same frame.  I simply can't live without it and in my opinion is a must have!

The last app we need to install is [Sublime Text 3][sublimetext].  Sublime Text is a code editor on par with (and in my opinion, better than) NotePad++, Emacs and Vim.  To get this one running we need to navigate to their site and click on the Ubuntu 64 bit download.  This will download a `.deb` file.  One that finishes we can double click on that file and install normally.

After the install completes open up Sublime Text.  From the menu select view, then show console.  There will be a terminal bar that opens up at the bottom.  Now we are going to install Sublime <a href="https://sublime.wbond.net/installation" target="_blank">Package Control</a>.  Follow the link for the instructions on that one.  It's pretty much a copy and paste, but there is a lot of code.  So copy carefully!

Now we have a package manager for Subline Text!

The last little thing left to do with Sublime Text and that is to install [GitGutter][gitgutter] via the newly installed package manager.  While still in Sublime Text, select `Preferences` from the menu, then `Package Control`.  A window will pop up with a list of options, select `Package Control: Install Package`.  That will take a few minutes to load.  Once it does, type in GitGutter and just click on the the package named `GitGutter`.

Once that completes you are all set!  Well, almost.  There are a few more things left to do still.  We need to get some servers running!!

---

###LAMP Server, PHPmyAdmin, Curl, Git
Open up a terminal or your freshly installed Terminator.  The next few parts will all be done by the comand line.  First we are going to install a LAMP server (Linux Apache MySQL PHP), PHPmyadmin, CURL, Git and a few other dependencies.  You will be prompted for usernames and passwords as you install.  Be sure to write down your credentials, or at least make them easy for you to remember.


{% highlight vim script %}
$ sudo apt-get install lamp-server^ phpmyadmin git curl libyaml-dev libxslt-dev libxml2-dev libsqlite3-dev
{% endhighlight %}

After those installs complete type the following lines substituting `USER` for your actual username:

{% highlight vim script %}
$ sudo usermod -a -G www-data USER
$ sudo chown -R USER:www-data /var/www/*
{% endhighlight %}

Then there is a little setup for [Git][git]:

{% highlight vim script %}
$ git config --global user.name [name]
$ git config --global user.email [email]
$ git config --global core.editor "subl -w"
{% endhighlight %}

Next we'll be installing [Ruby][ruby] and [RVM][rvm].
{% highlight vim script %}
$ \curl -L https://get.rvm.io | bash -s stable --ruby=2.1.1
{% endhighlight %}

Ruby may take a while to install.  So go grab a snack while it does it's magic.  Once that finishes type in the next few lines:

{% highlight vim script %}
$ rvm --default ruby-2.1.1

$ ruby -v
$ rvm -v
{% endhighlight %}

If get version numbers after typing in the `-v` commands, everything worked!  Once you've got Ruby, you're going to need to have [Ruby on Rails][rails] and [SASS][sass] too!

{% highlight vim script %}
$ gem install rails --version 4.0.4
$ gem install compass

$ mkdir rails_projects
{% endhighlight %}

The last main package we are going to install is [node.js][node].  I can't verify this next step, but if this works things have gotten much easier for installing Node!  The last time I installed nodejs it was much more complicated, although nodejs has been gaining a lot of traction lately.  It was only a matter of time before the install was simplified!

{% highlight vim script %}
$ curl -sL https://deb.nodesource.com/setup | sudo bash -

$ sudo apt-get install nodejs
{% endhighlight %}

---

###UI & Performance Tweaks
There are going to be a lot of commands in this section.  The goal is to speed things up a little and also give you a little more control over the UI.

Now we're going to download a few packages for some UI Tweaks.

{% highlight vim script %}
$ sudo apt-get install unity-tweak-tool gnome-tweak-tool compizconfig-settings-manager compiz-plugins-extra gnome-session-fallback
{% endhighlight %}

######Disable guest/remote login
{% highlight vim script %}
$ sudo gedit /etc/lightdm/lightdm.conf

allow-guest=false
greeter-show-remote-login=false
{% endhighlight %}

######Disable crash reports
{% highlight vim script %}
$ sudo gedit /etc/default/apport

enabled=0
{% endhighlight %}

######Disable dash serch/logging
Navigate to `Settings`, click on `Privacy`, then click `Disable dash search`.

---

###Last little bits

And that pretty much covers it.  The last little bit would be FTP, GIMP and MySQL Workbench.  All of these can be installed directly from the command line:

{% highlight vim script %}
$ sudo apt-get install filezilla gimp inkscape mysql-workbench
{% endhighlight %}

If you've followed all the steps and made it this far down, you are well on your way towards linux Web Development.  I breezed over many topics I may cover in greater detail in the future.  I hope this article was helpful and I hope you will enjoy developing in Linux just as much as I do!!

---

#####References
- [Virtualbox][virtualbox]
- [VMWare Player][vmware]
- [Docky][docky]
- [Terminator][terminator]
- [Sublime Text][sublimetext]
- [GitGutter][gitgutter]
- [LAMP Server][lamp]
- [PHPmyAdmin][phpmyadmin]
- [Git][git]
- [Ruby][ruby]
- [RVM][rvm]
- [Ruby on Rails][rails]
- [SASS][sass]
- [Node.js][node]
- [FileZilla][ftp]
- [GIMP][gimp]
- [MySQL Workbench][mysql]


[virtualbox]: https://www.virtualbox.org/
[vmware]: http://www.vmware.com/products/player
[docky]: http://wiki.go-docky.com/index.php?title=Welcome_to_the_Docky_wiki
[terminator]: http://gnometerminator.blogspot.com/p/introduction.html
[sublimetext]: http://www.sublimetext.com/3
[gitgutter]: https://github.com/jisaacks/GitGutter
[lamp]: http://en.wikipedia.org/wiki/LAMP_(software_bundle)
[phpmyadmin]: http://www.phpmyadmin.net/home_page/index.php
[git]: http://git-scm.com/
[ruby]: https://www.ruby-lang.org/en/
[rvm]: http://rvm.io/
[rails]: http://rubyonrails.org/
[sass]: http://sass-lang.com/
[node]: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
[ftp]: https://filezilla-project.org/
[gimp]: http://www.gimp.org/
[mysql]: http://dev.mysql.com/downloads/workbench/