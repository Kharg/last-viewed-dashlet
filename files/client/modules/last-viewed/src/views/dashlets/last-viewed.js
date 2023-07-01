define('last-viewed:views/dashlets/last-viewed', ['views/dashlets/abstract/base'], function (Dep) {

    return Dep.extend({
  
        name: 'Last Viewed Dashlet',
        scope: 'ActionHistoryRecord',
  
        templateContent: '<div class="list-container">{{{list}}}</div>',
  
        actionRefresh: function () {
            let listView = this.getView('list');
  
            if (!listView) {
                return;
            }
  
            this.RefreshList();
        },
  
        afterRender: function () {
  
          let viewName =
              this.getMetadata().get('clientDefs.' + this.scope + '.recordViews.listLastViewed') ||
              'views/record/list';
  
            this.getCollectionFactory().create(this.scope, (collection) => {
                this.collection = collection;
  
                collection.url = 'LastViewed';
                collection.maxSize = this.getOption('displayRecords');
  
                this.listenToOnce(collection, 'sync', () => {
                    this.createView('list', viewName, {
                        el: this.getSelector() + ' > .list-container',
                        collection: collection,
                        selectable: false,
                        checkboxes: false,
                        massActionsDisabled: true,
                        rowActionsView: false,
                        searchManager: this.searchManager,
                        checkAllResultDisabled: true,
                        buttonsDisabled: true,
                        headerDisabled: true,
                        layoutName: 'listForLastViewed',
                        layoutAclDisabled: true,
                    }, (view) => {
                        view.render();
                    });
                });
  
                collection.fetch();
            });
        },
  
        setupActionList: function () {
            this.actionList.unshift({
                name: 'viewList',
                text: this.translate('View'),
                iconHtml: '<span class="fas fa-align-justify"></span>',
                url: '#LastViewed',
            });
        },
  
        RefreshList() {
          this.collection.fetch();
      },
  
        actionViewList: function () {
            this.getRouter().navigate('#LastViewed', {trigger: true});
        },
    });
  });