from pageobject import PageObject

class Row(PageObject):
    def init_children(self):
        self.product_name = PageObject('//td[1]')
        self.add_to_cart_button = PageObject('//button[@test-id="add_to_cart_button"]')
        self.remove_from_cart_button = PageObject('//button[@test-id="remove_from_cart_button"]')
