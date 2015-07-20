angular.module('SchoolManage').factory('JsonApiOrg', function () {
  var JsonApiOrg = {
    _toJSON: function () {
      var json = angular.copy(this);
      JsonApiOrg._ignoredProps.forEach(function (prop) {
        delete json[prop];
      });
      return json;
    },
    _addUtilsTo: function (resource) {
      resource.toJSON = JsonApiOrg._toJSON;
      resource.$asLink = function () {
        return {type: this.$type, id: this.$id};
      };
      resource.$relationships.$add = function (name, link) {
        if (link.$asLink) link = link.$asLink();
        if (!this[name]) this[name] = {};
        if (!this[name].data) this[name].data = [];
        this[name].data.push(link);
        return this;
      };
      resource.$relationships.$set = function (name, link) {
        if (link.$asLink) link = link.$asLink();
        if (!this[name]) this[name] = {};
        this[name].data = link;
        return this;
      };
    },
    parseResource: function (item) {
      var resource = angular.copy(item.attributes);
      resource.$id = item.id;
      resource.$type = item.type;
      resource.$relationships = item.relationships || {};
      this._addUtilsTo(resource);
      return resource;
    },
    resourceMapAdd: function (resourceMap, resource) {
      var typedMap = resourceMap[resource.$type];
      if (!typedMap) typedMap = resourceMap[resource.$type] = {};
      typedMap[resource.$id] = resource;
    },
    resourceMapQuery: function (resourceMap, type, id) {
      if (typeof type === 'object') {
        id = type.id;
        type = type.type;
      }
      var typedMap = resourceMap[type];
      return typedMap && typedMap[id];
    },
    _ignoredProps: ['$related', '$root', '$byType', '$included'],
    populateRelated: function (resource, resourceMap) {
      resource.$related = resource.$related || {};
      for (var relationName in resource.$relationships) {
        var relation = resource.$relationships[relationName];
        if (relation && relation.data) {
          if (Array.isArray(relation.data)) {
            var relateds = resource.$related[relationName] = [];
            relation.data.forEach(function (link) {
              var related = JsonApiOrg.resourceMapQuery(resourceMap, link);
              if (related) relateds.push(related);
            });
          } else {
            resource.$related[relationName] =
              JsonApiOrg.resourceMapQuery(resourceMap, relation.data);
          }
        }
      }
      return resource;
    },
    parse: function (data, transformResource) {
      var resourceMap = {};
      if (!transformResource) transformResource = function (a) { return a; };
      var primary = null;
      if (Array.isArray(data.data)) {
        primary = [];
        data.data.forEach(function (item) {
          var resource = transformResource(
            JsonApiOrg.parseResource(item), primary);
          primary.push(resource);
          JsonApiOrg.resourceMapAdd(resourceMap, resource);
        });
      } else {
        primary = transformResource(JsonApiOrg.parseResource(data.data), null);
        JsonApiOrg.resourceMapAdd(resourceMap, primary);
      }
      primary.$root = data;
      primary.$byType = resourceMap;
      if (data.included) {
        primary.$included = [];
        data.included.forEach(function (item) {
          var resource = transformResource(
            JsonApiOrg.parseResource(item), null);
          primary.$included.push(resource);
          JsonApiOrg.resourceMapAdd(resourceMap, resource);
        });
      }
      if (Array.isArray(primary)) {
        primary.forEach(function (resource) {
          JsonApiOrg.populateRelated(resource, resourceMap);
        });
      } else {
        JsonApiOrg.populateRelated(primary, resourceMap);
      }
      if (primary.$included) {
        primary.$included.forEach(function (resource) {
          JsonApiOrg.populateRelated(resource, resourceMap);
        });
      }
      return primary;
    },
    serialize: function (resource) {
      var doc = {};
      if (Array.isArray(resource)) {
        doc.data = resource.map(function (r) {
          return JsonApiOrg.serializeResource(r);
        });
      } else {
        doc.data = JsonApiOrg.serializeResource(resource);
      }
      if (resource.$root) {
        for (var key in resource.$root) {
          if (doc.hasOwnProperty(key)) continue;
          doc[key] = resource.$root[key];
        }
      }
      return doc;
    },
    serializeResource: function (resource) {
      if (!resource.$type) return resource;
      var item = {};
      if (resource.toJSON) {
        item.attributes = resource.toJSON();
      } else {
        item.attributes = JsonApiOrg._toJSON.call(resource);
      }
      for (var key in item.attributes) {
        if (key[0] === '$') delete item.attributes[key];
      }
      item.type = resource.$type;
      item.id = resource.$id;
      item.relationships = resource.$relationships;
      return item;
    },
  };
  return JsonApiOrg;
});