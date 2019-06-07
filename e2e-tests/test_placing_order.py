from selenium.webdriver import Chrome
from pageobjects import App, Pages
from helpers import poll_server

# test data
maybe_wanted_product = 'Tesla Model X'
really_wanted_product = 'Tesla Model S'
eventually_wanted_product = 'Tesla Roadster'
initial_products = [maybe_wanted_product, really_wanted_product]
final_products = [really_wanted_product, eventually_wanted_product]

class TestPlacingOrder:
    def setup_method(self):
        poll_server()
        self.wd = Chrome()
        self.app = App(webdriver=self.wd)
        self.app.load()

    def teardown_method(self):
        self.wd.quit()

    def test_can_place_order(self):
        app = self.app

        # step 1 - add product A and B to cart
        app.navigate_to(Pages.PRODUCTS)
        for product in initial_products:
            app.products_page.add_to_cart(product)
        app.navigate_to(Pages.CART)

        cart_table = app.cart_page.products_table
        assert len(cart_table.rows) is 2, 'number of items should be {}'.format(2)
        for product in initial_products:
            assert cart_table.contains_product(product), '{} should be in the cart'.format(product)

        # step 2 - remove A and add C
        app.cart_page.remove_from_cart(maybe_wanted_product)
        app.navigate_to(Pages.PRODUCTS)
        app.products_page.add_to_cart(eventually_wanted_product)
        app.navigate_to(Pages.CART)

        assert len(cart_table.rows) is 2, 'number of items should be {}'.format(2)
        for product in final_products:
            assert cart_table.contains_product(product), '{} should be in the cart'.format(product)
        assert not cart_table.contains_product(maybe_wanted_product), '{} should not be in the cart'.format(maybe_wanted_product)

        # step 3 - submit order
        app.cart_page.submit_order()
        app.cart_page.wait_until_vanished()
        app.purchase_successful_notification.wait_until_existing()
