$(function() {
    $('.j-tooltip').tooltip();
    var gem_install_message_pre = "\
Fetching: addressable-2.3.5.gem (100%)\
\nFetching: launchy-2.3.0.gem (100%)\
\nFetching: require_all-1.3.2.gem (100%)\
\nFetching: tech-2.0.3.gem (100%)\
\nFetching: management-1.1.4.gem (100%)\
\nFetching: recruitments-0.0.1.gem (100%)\
\n ";
    var gem_install_message_post = "\
\n[[b;#d33682;]==== Release notes for recruitments gem ====]\
\n\
\nNow that you have installed this gem, you earn our immense respect.\
\nYou are the star guest of our recruitments, you will receive our special\
\nattention.\
\n    Go ahead and type [[b;#859900;]recruitments] on the command prompt to see the\
\nlist of commands available with it.\
\n\
\nWe love you!\
\n\
\n[[b;#b58900;]Google Developers Group]\
\n\
\n[[b;#d33682;]=======================================]\
\n\
\nSuccessfully installed addressable-2.3.5\
\nSuccessfully installed launchy-2.3.0\
\nSuccessfully installed require_all-1.3.2\
\nSuccessfully installed thor-0.18.1\
\nSuccessfully installed artii-2.0.3\
\nSuccessfully installed rainbow-1.1.4\
\nSuccessfully installed recruitments-0.0.1\
\n7 gems installed\
\n    ";
    var prompt = "[[b;#d33682;]root]@[[b;#6c71c4;]recruitments] ~$ ";
    var days_left = Math.round((new Date('2016 01 27') - new Date())/(1000*60*60*24));
    var recruitments_url = "https://goo.gl/Gm648C";
    var rsvp_url = "https://www.facebook.com/gdgvitvellore/?fref=ts";
    var venue_address = "\
Silver Jublee Tower\
\n(NSJT),\
\nVIT University, Vellore\
\nPin - 3632014\
    "

  var invitation_pre = "\
\n[[b;#d33682;]========= recruitments invitation ==========]\
  ";
var process = "\
\n[[b;#d33682;]========= recruitments process ==========]\
  ";
  var recruitments_text = "\
\n     Ḡøøℊʟ℮ Ḏ℮ṽ℮ʟ☺ρεґ﹩ Ḡґ◎üρ    \
  ";
  var invitation_post = "\
\nHi,\
\n\
\nWe are happy to announce our recruitments on 27 Jan, 2016. It will \
\nbe a great pleasure for us to have your presence  \
\nin the recruitments ceremony.                          \
\n                                                  \
\nEvent schedule:                                   \
\n\
\n 4:30 pm Club Introduction                   \
\n 5:00 pm Exam Begins                      \
\n\
\nGet Ready! Only [[b;#cb4b16;]" + days_left + "] days left.                 \
\n\
  ";
    var recruitments_help = "\
Commands: \
\n\t[[b;#268bd2;]recruitments invitation]      [[b;#2aa198;]# Your invitation card is inside this envelope] \
\n\t[[b;#268bd2;]recruitments gdg]           [[b;#2aa198;]# Glory words about the gdg] \
\n\t[[b;#268bd2;]recruitments location]        [[b;#2aa198;]# Google maps link to the recruitments venue] \
  ";
    var gdg = "\
\n[[b;#d33682;]========= GDG ==========]\
\n\
\nGDG VIT Vellore is a non-profit developers group \
\nto learn, share and know more about Google\
\ntechnologies.\
\nIf you want to contact us,\
\ngdgvitvellore@gmail.com\
\n\
  ";

    var you_are_late = "\
Sorry, you are slightly late for attending the event. \
\nRecruitments already got over on 29th November \
\nBut this site will remain here for archival purpose. \
\nRoam around happily :-) \
\n  "
    if (days_left >= 0) {
      you_are_late = ''
    }
    var greetings = you_are_late + recruitments_text + "\
\n\nWelcome to Ḡøøℊʟ℮ Ḏ℮ṽ℮ʟ☺ρεґ﹩ Ḡґ◎üρ's recruitments website. In order to retrieve your \
\ninvitation, first install recruitments gem using [[b;#859900;]gem install recruitments] command.\
\nOnce the gem is installed, type [[b;#859900;]recruitments] in the terminal to see the list of\
\navailable commands. \
\n \
\n \
\nPress [[b;#859900;]enter (↩)] to install the gem on this terminal.\
\n  ";

    var gem_list_empty = '\n*** LOCAL GEMS ***\n';
    var gem_list_full = '\n*** LOCAL GEMS ***\n\naddressable (2.3.5)\nlaunchy (2.3.0)\nrequire_all (1.3.2)\nthor (0.18.1)\nartii (2.0.3)\nrainbow (1.1.4)\nrecruitments (0.0.1)\n';


    var print_gem = 'RubyGems is a sophisticated package manager for Ruby.  This is a\nbasic help message containing pointers to more information.\n\n  Usage:\n    gem -v\n    gem command [arguments...] [options...]\n\n  Examples:\n    gem install rake\n    gem list --local\n    gem build package.gemspec\n    gem help install\n\n  Further help:\n    gem help commands            list all \'gem\' commands\n    gem help examples            show some examples of usage\n    gem help platforms           show information about platforms\n    gem help <COMMAND>           show help on COMMAND\n                                   (e.g. \'gem help install\')\n    gem server                   present a web page at\n                                 http://localhost:8808/\n                                 with info about installed gems\n  Further information:\n    http://rubygems.rubyforge.org';

    function print_slowly(term, paragraph, callback) {
      var foo, i, lines;
      lines = paragraph.split("\n");
      term.pause();
      i = 0;
      foo = function(lines) {
        return setTimeout((function() {
          if (i < lines.length -1) {
            term.echo(lines[i]);
            i++;
            return foo(lines);
          } else {
            term.resume();
            return callback();
          }
        }), 1000);
      };
      return foo(lines);
    };
    function require_command(command_regex, terminal_history) {
      var executed = false;
      $.each(terminal_history, function(index, value){
        if (command_regex.test(value)) {
          executed = true
        }
      });
      return executed;
        
    }
    var gem_install_regex = /gem +install +recruitments */ig;

    // Handle gem command
    function gem(inputs, term){
      // No second argument
      if (!inputs[1]) {
        term.echo(print_gem);
      } else if (inputs[1] === 'install' && inputs[2] === 'recruitments') {
        print_slowly(term, gem_install_message_pre, function(){
          term.echo(gem_install_message_post)
        });
      } else if (inputs[1] === '-v') {
        term.echo('1.3.6');
      } else if (inputs[1] == 'list') {
        // if history has install recruitments
        term.echo(gem_list_full);
        // else
        // term.echo(gem_list_empty)
      } else {
        term.echo(inputs.join(" ") + " is not a valid command")
      }
    }

    // Handle recruitments command
    function recruitments(inputs, term){
      if (!inputs[1]) {
        term.echo(recruitments_help);
      } else if (inputs[1] === "gdg") {
        term.echo(gdg);
      } else if (inputs[1] === "invitation") {
        term.echo(invitation_pre);
        term.pause();
        setTimeout(function(){
          term.resume();
          term.echo(recruitments_text);
          term.pause();
          setTimeout(function(){
            term.resume();
            term.echo(invitation_post);
          }, 400)
        }, 1500)
        
      } else if (inputs[1] === "location") {
        term.echo(venue_address);
        term.echo(recruitments_url);
        term.push(function(command, term) {
          if (/y(es){0,1}/.test(command)) {
            window.open(
              recruitments_url,
              '_blank'
            );
          }
          term.pop();
        }, {
          prompt: 'Do you want to open this link in the browser? (yes/no) ',
          greetings: null
        });
      } 
      else if(inputs[1] === "process"){
            term.echo(process);
            term.echo("\nPlease answer the following questions! ");
            term.echo("\nEnter your full name   :");
            term.pop();
            term.push(function(command,term){
              //term.echo(command);
              if(/^[a-zA-Z ]+$/.test(command)) {
                var name = command; 
              term.echo("\nYour name is " + name);
              term.pop();
              term.echo("\nEnter your registration number   :");
              term.push(function(command, term){
              if(!/^[0-9]2[a-zA-Z]3[0-9]3/.test(command)) {
                  var regno = command;
                  term.echo("\nYour Regno is " + regno);
                  //term.echo("Name " + name);
                  term.pop();
                  term.echo("\nEnter your email id   : ");
                  term.push(function(command, term){
                    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(command)) {
                     var email = command;
                      term.echo("\nYour email id is " + email);
                      term.pop();
                      term.echo("\nEnter you mobile no.   :");
                      term.push(function(command, term){
                        if(/^[789]\d{9}$/.test(command)){
                          var mobno = command;
                          term.echo("\nYour Mobile no is " + mobno);
                          term.pop();
                          term.echo("\nEnter 1. for Techical or 2. for Management   :");
                          term.push(function(command, term){
                            if(/1|2/.test(command)){
                              var choice = command;
                              //term.echo(choice);
                              term.pop();
                              term.echo("Your details are : \n");
                              term.echo("Name " + name +"\nRegistration No." + regno + 
                                "\nMobile No."+ mobno+ "\nEmail id" +email +"\nChoice" + choice);
                              term.echo("If the details are correct please enter 1 else 0");
                              term.push(function(command, term){
                                if(/1/.test(command)){
                                    term.echo("\nSuccessfully Registered!");
                                    term.pop();
                                    status = 1;                                  
                                }
                                else {
                                  term.echo("\nPlease try again!");
                                  status  = 0;
                                  term.pop();
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                } 
            });
           }
        }); 
      }

      else if (inputs[1] === "rsvp") {
        term.echo(rsvp)
        term.push(function(command, term) {
          window.open(
              rsvp_url,
              '_blank'
          );
          term.pop();
        }, {
          prompt: 'alternatively send me a tweet in a new window when you press [[b;#859900;]enter (↩)]',
          greetings: null
        });
      } else {
        term.error(inputs.join(" ") + " is not a valid command")
      }
    }

    // Main interpreter function
    function interpreter(input, term) {
      var command, inputs;
      inputs = input.split(/ +/)
      command = inputs[0];
      if (command === "gem") {
        gem(inputs, term);
      } else if (command === "recruitments" || command === "help") {
        window.terminal = term;
        if (require_command(gem_install_regex, term.history().data())) {
          recruitments(inputs, term);
        } else {
          term.error('Please install the gem first by executing\ngem install recruitments');
        }
      } else if (/(cd)|(ls)|(cat)/.test(command)) {
        bash(inputs, term);
      } else if (input === "ruby -v"){
        term.echo("1.9.3");
      } else if (/which +recruitments/.test(input)) {
        if (require_command(gem_install_regex, term.history().data())) {
          term.echo("/usr/bin/recruitments");
        } // else do nothing
      } else if (/whoami/.test(input)) {
        term.echo("root");
      } else if (command.length === 0) {
        // do nothing
      } else {
        term.error(command + " is not a valid command");
      }
    }

    // Handle bash commands
    function bash(inputs, term) {
      var argument, echo, insert;

      echo = term.echo;
      insert = term.insert;
      if (!inputs[1]) {
        return console.log("none");
      } else {
        argument = inputs[1];
        if (/^\.\./.test(argument)) {
          return echo("-bash: cd: " + argument + ": Permission denied");
        } else {
          return echo("-bash: cd: " + argument + ": No such file or directory");
        }
      }
    };

    $('#terminal').terminal( interpreter, {
      prompt: prompt,
      name: 'recruitments',
      greetings: greetings,
      height: 585,
      onInit: function(term){
        term.insert("gem install recruitments");
        term.history().clear();
      },
      completion: function(term, string, callback){
        callback(['gem install recruitments',
          'recruitments invitation',
          'recruitments location',
          'recruitments  process',
          'recruitments gdg']);
      },
      tabcompletion: true
    });

});
