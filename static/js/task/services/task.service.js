/**
* TaskService
* @namespace crowdsource.tasks.services
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.task.services')
    .factory('Task', Task);

  Task.$inject = ['$cookies', '$q', '$location', 'HttpService'];

  /**
  * @namespace Task
  * @returns {Factory}
  */

  function Task($cookies, $q, $location, HttpService) {
    /**
    * @name TaskService
    * @desc The Factory to be returned
    */
    var Task = {
      getModule: getModule,
      getTask: getTask,
      acceptTask: acceptTask,
      getTaskWithData: getTaskWithData,
      submitTask: submitTask,
      skipTask: skipTask
    };

    return Task;

    function getTask(taskId) {
      var settings = {
        url: '/api/task/' + taskId + '/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function acceptTask(module_id) {
      var settings = {
        url: '/api/task-worker/',
        method: 'POST',
        data: {
          module: module_id
        }
      };
      return HttpService.doRequest(settings);
    }

    function getModule (moduleId) {
      var settings = {
        url: '/api/module/' + moduleId + '/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function getTaskWithData(task_id){
      var settings = {
        url: '/api/task/' + task_id + '/retrieve_with_data/',
        method: 'GET'
      };
      return HttpService.doRequest(settings);
    }

    function submitTask(data){
      var settings = {
        url: '/api/task-worker-result/submit-results/',
        method: 'POST',
        data: data
      };
      return HttpService.doRequest(settings);
    }

    function skipTask(task_id){
      var settings = {
        url: '/api/task-worker/'+task_id+'/',
        method: 'DELETE'
      };
      return HttpService.doRequest(settings);
    }


  }
})();