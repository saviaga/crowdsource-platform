/**
* Project
* @namespace crowdsource.project.services
* @author dmorina neilthemathguy
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.project.services')
    .factory('Project', Project);

  Project.$inject = ['$cookies', '$http', '$q', '$location', 'HttpService'];

  /**
  * @namespace Project
  * @returns {Factory}
  */

  function Project($cookies, $http, $q, $location, HttpService) {
    /**
    * @name Project
    * @desc The Factory to be returned
    */
    var instance = {
      totalTasks: 1
    };
    var Project = {
      syncLocally: syncLocally,
      retrieve: retrieve,
      addProject: addProject,
      addMilestone: addMilestone,
      getCategories: getCategories,
      getReferenceData: getReferenceData,
      getProjects: getProjects,
      getLastMilestone: getLastMilestone,
      clean: clean,
      getRequesterProjects: getRequesterProjects
    };

    return Project;


    /**
    * @name addProject
    * @desc Try to create a new project
    * @returns {Promise}
    * @memberOf crowdsource.project.services.Project
    */
    function addProject(project) {
      var settings = {
        url: '/api/project/',
        method: 'POST',
        data: {
          name: project.name,
          description: project.description,
          categories: project.categories,
          modules: [
            {
              name: 'Prototype Task',
              description: project.taskDescription,
              template: [
                {
                  name: project.template.name,
                  share_with_others: true,
                  template_items: project.template.items
                }
              ],
              price: project.payment.wage_per_hit,
              status: 1,
              repetition: project.payment.number_of_hits || 1,
              number_of_hits: project.payment.number_of_hits,
              module_timeout: 0,
              has_data_set: true,
              is_micro: project.microFlag=='micro',
              is_prototype: true,
              data_set_location: '',
              file_id: project.metadata ? project.metadata.id : null
            }
          ]
        }
      };
      return HttpService.doRequest(settings);
    }

    function addMilestone(project, projectId) {
      var settings = {
        url: '/api/module/',
        method: 'POST',
        data: {
          name: project.moduleName,
          description: project.taskDescription,
          project: projectId,
          template: [
            {
              name: project.template.name,
              share_with_others: true,
              template_items: project.template.items
            }
          ],
          price: project.payment.wage_per_hit,
          status: 1,
          repetition: project.payment.number_of_hits || 1,
          number_of_hits: project.payment.number_of_hits,
          module_timeout: 0,
          has_data_set: true,
          is_micro: project.microFlag=='micro',
          is_prototype: false,
          file_id: project.metadata ? project.metadata.id : null
        }
      };
      return HttpService.doRequest(settings);
    }

    function getProjects() {
      var settings = {
        url: '/api/project/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function getRequesterProjects(){
      var settings = {
        url: '/api/project/requester_projects/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function getCategories() {
      var settings = {
        url: '/api/category/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function getReferenceData() {
      return $http({
        url: 'https://api.myjson.com/bins/4ovc8',
        method: 'GET'
      });
    }

    function getLastMilestone(projectId) {
      var settings = {
        url: '/api/module/get_last_milestone/',
        method: 'GET',
        params: {
          projectId: projectId
        }
      };
      return HttpService.doRequest(settings);
    }

    function syncLocally(projectInstance) {
      instance = projectInstance;
    }

    function retrieve() {
      return instance;
    }

    function clean() {
      instance = {};
    }

  }
})();
