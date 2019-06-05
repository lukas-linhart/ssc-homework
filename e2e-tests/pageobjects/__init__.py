from pageobject import Page, PageObject, PageObjectList
from .menu import Menu
from .products_page import ProductsPage
from .cart_page import CartPage
from .order_details_page import OrderDetailsPage
from .notification import Notification

class Pages():
    PRODUCTS = 'products'
    CART = 'cart'
    ORDER_DETAILS = 'order_details'

class App(Page):
    requested_url = 'http://localhost:3000'

    def init_children(self):
        self.menu = Menu(None)
        self.products_page = ProductsPage(None)
        self.cart_page = CartPage(None)
        self.order_details_page = OrderDetailsPage(None)
        self.page_title = PageObject('//h1')
        self.notification = Notification(None)
        self.purchase_successful_notification = PageObject('//*[@test-id="notification"][contains(text(),"Purchase success")]')
        self.order_deletion_successful_notification = PageObject('//*[@test-id="notification"][contains(text(),"Order deletion success")]')

    def navigate_to(self, page):
        self.menu[page].wait_until_existing().click()
        self['{}_page'.format(page)].wait_until_existing()

    def order_products(self, products):
        self.navigate_to(Pages.PRODUCTS)
        for product in products:
            self.products_page.add_to_cart(product)
        self.navigate_to(Pages.CART)
        self.cart_page.submit_order()
        self.purchase_successful_notification.wait_until_existing()
        return self.notification.get_order_id()

    def delete_order(self, order_id):
        self.navigate_to(Pages.ORDER_DETAILS)
        self.order_details_page.query_order(order_id)
        self.order_details_page.delete_order()
        self.order_deletion_successful_notification.wait_until_existing()
        return self.notification.get_order_id()
