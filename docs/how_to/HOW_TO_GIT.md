# Motivation for using git

Git is a version control system allowing developers to track and manage changes to their codebase over time. Using Git offers several benefits:

1. **Collaboration**: Git streamlines collaboration, enabling multiple developers to work on the same codebase. It provides a central repository for tracking and merging code changes.
2. **History**: Git maintains a comprehensive history of all changes to the codebase, enabling easy access to previous versions and visibility into who made specific changes.
3. **Branching**: Git allows developers to create separate branches of the codebase, providing a safe environment to experiment with new features or fix bugs without affecting the main codebase.
4. **Reuse**: Git facilitates code sharing or reuse across different projects, leveraging features such as branching and merging.

Using Git ultimately aids developers in working more efficiently, effectively tracking and managing code changes, and improving collaboration.

# Git vs GitHub

While Git and GitHub are closely related, they serve distinct purposes in software development.

**Git** is a version control system that helps developers track and manage changes to their codebase over time. Git enables developers to create a local repository on their computer to track and manage code changes. It also offers tools for merging and sharing code with other developers.

On the other hand, **GitHub** is a web-based platform that hosts Git repositories and provides tools for collaboration and code project management. GitHub offers a central repository for storing and sharing code, in addition to tools for tracking issues, reviewing code changes, and managing project workflows.

In summary, Git is a local version control system, while GitHub is a web-based platform providing hosting and collaboration tools for Git repositories. Developers often use both Git and GitHub together to manage and collaborate on code projects.

## GitHub Features:

### Issues

Issues in GitHub serve to track and manage tasks, bugs, and other concerns related to a code project. They can be created, assigned to team members, and used to track progress and facilitate communication. Here's how to use issues:

1. Go to the Issues tab in your repository on GitHub.
2. Click the "New issue" button.
3. Enter a descriptive title and a detailed description of the issue. You can also assign the issue to a team member or add a label.
4. Click the "Submit new issue" button.

Once created, issues can be assigned, commented on, labeled, or closed upon resolution.

### Milestones

Milestones enable tracking and managing the progress of a code project. They group related issues and help set deadlines. To use milestones:

1. Go to the Issues tab in your repository on GitHub.
2. Click on "Milestones".
3. Click the "New Milestone" button.
4. Enter a title, due date (optional), and description for the milestone.
5. Click "Create Milestone".

You can add issues to a milestone, track its progress, and view the number of open and closed issues within it.

### Pull Requests

Pull requests allow developers to propose and collaborate on code changes. They are used to suggest code alterations, review modifications made by others, and merge changes into the main branch of a repository. Here's how to create a pull request:

1. Create a new branch in your repository for your code changes.
2. Make your modifications and commit them to the branch.
3. Go to the Pull requests tab in your repository on GitHub.
4. Click the "New pull request" button.
5. Select the branch with your code changes as the "compare" branch and the repository's main branch as the "base" branch.
6. Review the changes and add a descriptive title and detailed description.
7. Click the "Create pull request" button.

Once created, pull requests can be reviewed, discussed, and if approved, merged into the main branch.

### Discussions

Discussions in GitHub provide a dedicated space for collaboration. They allow for open-ended conversations and are ideal for questions, open-ended conversations, and sharing information. To use discussions:

1. Go to the Discussions tab in your repository on GitHub.
2. Click the "New discussion" button.
3. Select the category for your discussion.
4. Write your discussion's title and details.
5. Click "Start discussion".

# Simple Guide - Minimal Flow to Contribute to the Project

### Clone from Repository  
- ```git clone https://github.com/amichai-bd/fpga_mafia.git```  
- ```cd fpga_mafia```  

### Create a New Branch  
- ```git checkout -b "branch_name"```  

### Modify, Stage, and Commit  
- Make your changes  
- ```git add .```  
- ```git commit -m 'your commit'```  

### Pull from origin/main (to ensure no conflicts)  
- ```git pull origin main```  
- Resolve any conflicts, if necessary
  
### Push to Origin
- ```git push origin "branch_name"```  

###  Add a Pull Request
- Visit your repository on "https://github.com/" and create a pull request via "Pull requests->New pull request"

# Advanced Flows

### Merge Conflict
- Merge conflicts happen when changes are made to the same part of a file on two different branches. Git doesn't know which changes to incorporate into the final merge. Therefore, you need to manually decide and resolve these conflicts.

### Amend Commits
- If you need to modify the most recent commit (for instance, if you forgot to add a file or need to change the commit message), you can use ```git commit --amend```. However, be cautious when amending commits that have already been pushed to a public branch, as it can cause problems for other developers.

### Revert Commit
- If you need to undo changes introduced by a specific commit, use ```git revert <commit_id>```. This creates a new commit that undoes all the changes made in the specified commit. It's a safe operation to use in a public branch.

Remember to consult the [official Git documentation](https://git-scm.com/doc) for detailed explanations and advanced usage examples. It's a valuable resource for learning more about Git's powerful features.
