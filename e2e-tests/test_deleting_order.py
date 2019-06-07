from selenium.webdriver import Chrome
from pageobjects import App, Pages
from helpers import poll_server

# test data
products = ['Tesla Model X', 'Tesla Model 3']

class TestDeletingOrder:
    def setup_method(self):
        poll_server()

        # place an order and kill the browser
        wd = Chrome()
        app = App(webdriver=wd)
        app.load()
        self.order_id = app.order_products(products)
        wd.quit()

        # and start with clean browser
        self.wd = Chrome()
        self.app = App(webdriver=self.wd)
        self.app.load()

    def teardown_method(self):
        self.wd.quit()

    def test_can_delete_order(self):
        app = self.app

        # step 1 - query product on id
        app.navigate_to(Pages.ORDER_DETAILS)
        app.order_details_page.query_order(self.order_id)

        assert app.order_details_page.products_table.is_existing(), 'order {} does not exist'.format(self.order_id)
        retrieved_products = app.order_details_page.products_table.get_products()
        assert set(retrieved_products) == set(products)

        # step 2 - delete the order
        app.order_details_page.delete_order()
        app.order_deletion_successful_notification.wait_until_existing()
        deleted_order_id = app.notification.get_order_id()
        assert deleted_order_id == self.order_id, 'deleted order id {} does not match the original order id {}'.format(deleted_order_id, self.order_id)
