from pageobject import PageObject
from pageobjects.common.products_table import ProductsTable

class CartPage(PageObject):
    default_locator = '//main[@test-id="cart"]'

    def init_children(self):
        self.products_table = ProductsTable(None)
        self.submit_order_button = PageObject('//button[@test-id="submit_order_button"]')

    def submit_order(self):
        self.submit_order_button.wait_until_existing().click()

    def remove_from_cart(self, product_name):
        row = self.products_table.row_by_product_name(product_name)
        if not row:
            raise ValueError('"{}" is not in the products list'.format(product_name))
        row.remove_from_cart_button.click()
