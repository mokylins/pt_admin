/**
 * Created by 李朝(Li.Zhao) on 2016/4/15.
 */

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.selection.CheckboxModel','Ext.ux.form.DateTimeField']);

/**
 *权限管理
 */

Ext.QuickTips.init();


// 订单存储模块
var orderStore = Ext
    .create(
        "Ext.data.Store",
        {
            autoLoad: true,
            fields: ["vOrderNo", "vUserId", "iPlayerId", 'iRmb','iGameId','iWorldId','bValidated','requestgamenum','dtCreateTime','dtUpdateTime','iPlatformType','vPlatformAccount','vPlatformOrderNo'],
            proxy: {
                type: "jsonp",
                url: URLS.PAY.PAGE_ORDER,
                callbackKey: "function",
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

Ext.onReady(function () {

    var orderGrid = new Ext.grid.Panel(
        {
            multiSelect: true,// 支持多选
            selType: 'rowmodel',// 设置为单元格选择模式Ext.selection.RowModel
            id: "authGridId",
            store: orderStore,
            viewConfig:{
                stripeRows:true,//在表格中显示斑马线
                enableTextSelection:true //可以复制单元格文字
            },
            loadMask: {
                msg: "正在加载数据,请稍等..."
            },
            columns: [
                Ext.create("Ext.grid.RowNumberer"),
                {
                    text: "订单号",
                    width: 200,
                    dataIndex: "vOrderNo"
                },
                {
                    text: "用户id",
                    width: 150,
                    dataIndex: "vUserId"
                },
                {
                    text: "角色id",
                    width: 150,
                    dataIndex: "iPlayerId"
                },
                {
                    text: "iRmb",
                    width: 150,
                    dataIndex: "人民币"
                },
                {
                    text: "游戏id",
                    width: 150,
                    dataIndex: "iGameId"
                },{
                    text: "区服id",
                    width: 150,
                    dataIndex: "iWorldId"
                },
                {
                    header: "操作",
                    width: 150,
                    dataIndex: "sequence",
                    renderer:function(val,metaData,record,rowIndex,store,view){
                        var value = record.raw;
                        value.opentime = value.opentime.replace(/\..*$/,"");
                        var records = JSON.stringify(value).replace(/"/g,'\"');
                        return    '<a style="text-decoration:none;margin-right:5px;" href=\'javascript:updateServer('+records+');\'><img src="js/extjs/resources/icons/pencil.png"  title="修改" alt="修改" class="actionColumnImg" />&nbsp;</a>'
                            + '<a style="text-decoration:none;margin-right:5px;" href="javascript:deleteServer(\''+value.gid+'\',\''+value.sid+'\');"><img src="js/extjs/resources/icons/delete.png"  title="删除" alt="删除" class="actionColumnImg" />&nbsp;</a>';
                    }
                }

            ]

        });

    /**
      * 布局
      */
    new Ext.Viewport({
         layout: "fit",
         items: [orderGrid],
         renderTo: Ext.getBody()
    });


});

