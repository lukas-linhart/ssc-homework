from pageobject import PageObject

class Menu(PageObject):
    default_locator = '//ul[@test-id="menu"]'

    def init_children(self):
        self.products = PageObject('//li[@test-id="products"]/*')
        self.cart = PageObject('//li[@test-id="cart"]/*')
        self.order_details = PageObject('//li[@test-id="order details"]/*')
