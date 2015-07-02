angular.module('cover').factory('JsonApiOrg', function () {
  return {
    _prop: function (obj, prop, value, configurable) {
      Object.defineProperty(obj, prop, {value: value, configurable: configurable});
    },
    parseResource: function (item) {
      var resource = angular.copy(item.attributes);
      resource.$id = item.id;
      resource.$type = item.type;
      resource.$relationships = item.relationships;
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
    populateRelated: function (resource, resourceMap) {
      var that = this;
      this._prop(resource, '$related', resource.$related || {}, true);
      for (var relationName in resource.$relationships) {
        var relation = resource.$relationships[relationName];
        if (relation && relation.data) {
          if (Array.isArray(relation.data)) {
            var relateds = resource.$related[relationName] = [];
            relation.data.forEach(function (link) {
              var related = that.resourceMapQuery(resourceMap, link);
              if (related) relateds.push(related);
            });
          } else {
            resource.$related[relationName] =
              that.resourceMapQuery(resourceMap, relation.data);
          }
        }
      }
      return resource;
    },
    parse: function (data, transformResource) {
      var that = this;
      var resourceMap = {};
      if (!transformResource) transformResource = function (a) { return a; };
      var primary = null;
      if (Array.isArray(data.data)) {
        primary = [];
        data.data.forEach(function (item) {
          var resource = transformResource(that.parseResource(item), primary);
          primary.push(resource);
          that.resourceMapAdd(resourceMap, resource);
        });
      } else {
        primary = transformResource(that.parseResource(data.data), null);
        that.resourceMapAdd(resourceMap, primary);
      }
      this._prop(primary, '$root', data);
      this._prop(primary, '$included', []);
      this._prop(primary, '$byType', resourceMap);
      data.included.forEach(function (item) {
        var resource = transformResource(that.parseResource(item), null);
        primary.$included.push(resource);
        that.resourceMapAdd(resourceMap, resource);
      });
      if (Array.isArray(primary)) {
        primary.forEach(function (resource) {
          that.populateRelated(resource, resourceMap);
        });
      } else {
        that.populateRelated(primary, resourceMap);
      }
      primary.$included.forEach(function (resource) {
        that.populateRelated(resource, resourceMap);
      });
      return primary;
    },
  }
});
