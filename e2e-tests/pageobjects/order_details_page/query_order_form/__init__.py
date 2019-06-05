from pageobject import PageObject

class QueryOrderForm(PageObject):
    default_locator = '//*[@test-id="order_query_form"]'

    def init_children(self):
        self.show_order_button = PageObject('//button')
        self.input = PageObject('//input')

    def query_order(self, order_id):
        self.input.clear()
        self.input.set_value(order_id)
        self.show_order_button.click()

    """
    def delete_order(self, order_id):
        self.delete_order_button.wait_until_existing().click()
    """
