from pageobject import PageObject
from pageobjects.common.products_table import ProductsTable
from .query_order_form import QueryOrderForm

class OrderDetailsPage(PageObject):
    default_locator = '//main[@test-id="order_details"]'

    def init_children(self):
        self.query_order_form = QueryOrderForm(None)
        self.products_table = ProductsTable(None)
        self.delete_order_button = PageObject('//button[@test-id="delete_order_button"]')
        self.no_order_selected = PageObject('//button[@test-id="no_order_selected"]')
        self.no_such_order = PageObject('//button[@test-id="no_such_order"]')

    def query_order(self, order_id):
        self.query_order_form.query_order(order_id)
        self.no_order_selected.wait_until_vanished()

    def delete_order(self):
        if self.products_table.is_existing():
            self.delete_order_button.wait_until_existing().click()
