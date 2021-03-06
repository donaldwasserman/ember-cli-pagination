import Ember from 'ember';
import { module, test } from 'ember-qunit';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import MockStore from '../../helpers/mock-store';

module("Remote Route Mixin");

test("thing", function(assert) {
  var store = MockStore.create();

  var Something = Ember.Object.extend(RouteMixin, {});
  var something = Something.create({store: store});

  something.findPaged("todo",{name: "Adam"});
  var findArgs = store.get('findArgs');

  assert.equal(findArgs.length,1);
  assert.equal(findArgs[0].modelName,"todo");
  assert.equal(findArgs[0].params.name,"Adam");
});

test("default model name", function(assert) {
  var Route = Ember.Object.extend(RouteMixin, {});
  var route = Route.create();

  assert.equal('route', route._findModelName('route'));
  assert.equal('route', route._findModelName('routes'));
  assert.equal('routeName', route._findModelName('route-name'));
  assert.equal('routeName', route._findModelName('route-names'));
});

test("arguments passed to findPaged", function(assert) {
  var store = MockStore.create();

  var Something = Ember.Object.extend(RouteMixin, {});
  var something = Something.create({store: store});
  something.set('routeName', 'todo');

  something.model({name: "Adam"});
  var findArgs = store.get('findArgs');

  assert.equal(findArgs.length,1);
  assert.equal(findArgs[0].modelName,"todo");
  assert.equal(findArgs[0].params.name,"Adam");
});

test("can pass param mappings", function(assert) {
  var store = MockStore.create();

  var Something = Ember.Object.extend(RouteMixin, {});
  var something = Something.create({store: store});

  something.findPaged("todo",{},{},function(remote) {
    remote.addQueryParamMapping('page','current_page');
  });

  //paramMapping: {page: "current_page"}}
  var findArgs = store.get('findArgs');

  assert.equal(findArgs.length,1);
  assert.equal(findArgs[0].params.current_page,1);
});
