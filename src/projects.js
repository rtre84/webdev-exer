function Project(id, type, name, lastActivity) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.lastActivity = lastActivity;
}

// The list of all projects currently in the system.
// (Feel free to imagine this came from a database somewhere on page load.)
var CURRENT_PROJECTS = [
    new Project(0, "Training", "Patrick's experimental branch", new Date(2014, 6, 17, 13, 5, 842)),
    new Project(1, "Testing", "Blind test of autosuggest model", new Date(2014, 6, 21, 18, 44, 229))
];

// The current maximum ID, so we know how to allocate an ID for a new project.
// (Yes, the database should be taking care of this, too.)
var MAX_ID = Math.max.apply(null, $.map(CURRENT_PROJECTS, function(pj) { return pj.id; }));

$(function(){
    var loadProjects = function($container, projects) {
        $.fn.append.apply($container, $.map(projects, function(pj) {
            return $("<tr>").append(
                $("<td>").text(pj.id),
                $("<td>").text(pj.type),
                $("<td>").text(pj.name),
                $("<td>").text(pj.lastActivity.toString())
            );
        }));
    };

    // Creates a new project based on the user input in the form.
    var createProject = function($form) {
        return new Project(
            MAX_ID + 1,
            $form.find("#project-type").val(),
            $form.find("#project-name").val(),
            new Date()
        );
    };

    // Clears the data in the form so that it's easy to enter a new project.
    var resetForm = function($form) {
        $form.find("#project-type").val("");
        $form.find("#project-name").val("");
        $form.find("input:first").focus();
    };

    var $projectTable = $("#project-list>tbody");
    loadProjects($projectTable, CURRENT_PROJECTS);

    $("#add-project-form").submit(function(e) {
        var $form = $(this);
        pj = createProject($form);
        MAX_ID = pj.id;
        CURRENT_PROJECTS.push(pj);
        loadProjects($projectTable, [pj]);
        resetForm($form);
        e.preventDefault();
    });

   /*******************************************************
    * Adding in Branch Logic in response to webdev-exercise
    * Anup Vasudevan : 08/06/2014
    ******************************************************/

    
    var user = new Gh3.User("mquander")
      , repoTitle = $(".repoTitle")
      , branchTitle = $(".branchTitle")
      , branchProperties = $("ul");

    //get some repositories of k33g
    var userRepositories = new Gh3.Repositories(user);

    userRepositories.fetch({page:5, per_page:5, direction : "desc"},"next", function (err, res) {
      if(err) {
        throw "ouch ..."
      }

      console.log("Repositories", userRepositories);
    });

    //get one repository
    var userRepo = new Gh3.Repository("webdev-exercise", user);

    //fetch information on branches via github api
    userRepo.fetch(function (err, res) {
      if(err) {
        console.log("Error", err.message, res.status)
        throw err
      }

      userRepo.fetchBranches(function (err, res) {
        if(err) {
          console.log("Error", err.message, res.status)
          throw err
        }

        //fetch master branch
        var master = userRepo.getBranchByName("master");
        var master_sha = master.sha;

        //compare sha against master believed to be up-to-date
        function uptodate(master_sha, branch_sha){
              if(master_sha !== branch_sha){
                return 'Out-of-date';
              }
              else {
                return 'Latest';
              }
        };

        //output branches
         userRepo.eachBranch(function (branch) {
            $('.name').append(branch.name + '<br>');
            $('.sha').append(branch.sha + '<br>');
            $('.status').append(uptodate(master_sha, branch.sha) + '<br>');
         });

     });
    });

});
