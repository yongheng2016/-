module.exports = {
    '/Order/QueryOrder': {
        'error_code': '200',
        'error_msg': 'OK',
        'data': {
            'data|7': [{
                'id|+1': 1,
                'orderPrice': 1,  //总价
                'orderId': 104121524973748,  //订单id
                'orderDate': 1523513925000,  //下单时间
                'orderGoodsPrice': '@integer(100,2000)', //商品价格
                'freight': '@integer(10,50)', //邮费
                'orderUserName': '杨-15001145400',  //收货人姓名、电话
                'orderAddressName': "@county(true)",  //收货地址
                'stock_num': '@integer(0,100)',//库存数量  
                'orderStatusId|+1': -1,
                'OrderGoods|2': [{
                    'costPrice': '@integer(20,100)',  //
                    'goodsId': 3001,  //商品id
                    'goodsImg': 'goods_img/goods/hx-1.jpg,goods_img/goods/hx-2.jpg,goods_img/goods/hx-3.jpg',  //商品图
                    'goodsName': "红侠早早孕试纸",  //商品名称
                    'goodsNumber': '@integer(1,10)',  //订单数量
                    'orderGoodsPrice': '@integer(20,100)',  //商品价格
                    'orderStatusId': 0
                    // 'title': '@ctitle(3,8)',
                    // 'city': "@county(true)",
                    // 'stock_num': '@integer(0,100)',//库存数量  
                    // 'marketing_start': '@datetime()',
                    // 'marketing_stop': '@now()',                    
                }]
            }]
        }
    },
    '//Order/QueryOrder': {
        'error_code': '200',
        'error_msg': 'OK',
        'data': {
            'data': [{
                'id|+1': 1,
                'orderPrice': 10.01,  //总价
                'orderZto': 7302740237,  //物流单号
                'orderId': 104121524973748,  //订单id
                'orderDate': 1523513925000,  //下单时间
                'orderGoodsPrice': '@integer(100,2000)', //订单总价
                'freight': '@integer(1,3)', //邮费
                'orderUserName': '杨-15001145400',  //收货人姓名、电话
                'orderAddressName': "@county(true)",  //收货地址
                'stock_num': '@integer(0,100)',//库存数量  
                'orderStatusId|+1': -1,
                'OrderGoods|2': [{
                    'costPrice': '@integer(20,100)',  //
                    'goodsId': 3001,  //商品id
                    'goodsImg': 'goods_img/goods/hx-1.jpg,goods_img/goods/hx-2.jpg,goods_img/goods/hx-3.jpg',  //商品图
                    'goodsName': "红侠早早孕试纸",  //商品名称
                    'goodsNumber': '@integer(1,10)',  //订单数量
                    'orderGoodsPrice': '@integer(20,100)',  //商品价格
                    'orderStatusId': 0,
                    'orderId': 104121524973748,  //订单id                    
                    // 'title': '@ctitle(3,8)',
                    // 'city': "@county(true)",
                    // 'stock_num': '@integer(0,100)',//库存数量  
                    // 'marketing_start': '@datetime()',
                    // 'marketing_stop': '@now()',                    
                }]
            }]
        }
    } 
}
