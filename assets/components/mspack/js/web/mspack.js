var msPack = {
    initialize: function(config)
    {
        var total = $('#msCart .ms2_total_cost').text();
        $('#mspack-total').text(total);

        // После загрузки страницы получить стоимость заказа
        miniShop2.Callbacks.add('Order.getcost.response.success', 'orders_add', function(response) {
            var orderCost = response.data.cost; // Здесь всегда актуальная стоимость заказа без упаковки
            // Получить отмеченный инпут
            var packPrice = parseFloat($('.mspack:checked').data('mspack'));
            
            if (orderCost >= config.freePack) {
                $('#mspack-price').text(0);
                return false;
            } else {
                $('#mspack-price').text(packPrice);
            }
            
            $(document).on('change', 'input[name=mspack]', function() {
                packPrice = $(this).data('mspack');
                msPack.setTotal(orderCost, packPrice);
                $('#mspack-price').text(packPrice);
            });
            msPack.setTotal(orderCost, packPrice);
        });
    },
    
    setTotal: function(orderCost, packPrice)
    {
        var sum = orderCost + packPrice;
        $('#ms2_order_cost').text(sum);
    }
};