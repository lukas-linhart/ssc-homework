from pageobject import PageObject
from pageobjects.common.products_table import ProductsTable

SEPARATOR = ':'

class Notification(PageObject):
    default_locator = '//*[@test-id="notification"]'

    def init_children(self):
        pass

    def get_order_id(self):
        tokens = self.text.rpartition(SEPARATOR)
        if SEPARATOR in tokens:
            return tokens[-1].strip()
        else:
            return None
