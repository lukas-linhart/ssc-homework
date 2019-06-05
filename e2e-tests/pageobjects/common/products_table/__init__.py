from pageobject import PageObject, PageObjectList
from .row import Row

class ProductsTable(PageObject):
    default_locator = '//table[@test-id="products_table"]'

    def init_children(self):
        self.rows = PageObjectList('//tbody/tr', children_class=Row)

    def row_by_product_name(self, product_name):
        product_names = [row.product_name.text for row in self.rows]
        index = product_names.index(product_name)
        return self.rows[index]

    def get_products(self):
        return [row.product_name.text for row in self.rows]

    def contains_product(self, product_name):
        return product_name in self.get_products()
