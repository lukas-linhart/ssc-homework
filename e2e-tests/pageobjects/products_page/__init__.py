from pageobject import PageObject
from pageobjects.common.products_table import ProductsTable

class ProductsPage(PageObject):
    default_locator = '//main[@test-id="products"]'

    def init_children(self):
        self.products_table = ProductsTable(None)

    def add_to_cart(self, product_name):
        row = self.products_table.row_by_product_name(product_name)
        if not row:
            raise ValueError('"{}" is not in the products list'.format(product_name))
        row.add_to_cart_button.click()
