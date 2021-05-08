const paymentServicesBtn = document.querySelector(".footer__content-item-btn");
const paymentServices = document.querySelector(".payment-services");

const closePaymentServices = document.querySelector(".payment-services__content-block-close");


paymentServicesBtn.addEventListener("click", () => {
    paymentServices.classList.add("payment-services-active");
    add_deleteRightPadding();
});

closePaymentServices.addEventListener("click", () => {
    paymentServices.classList.remove("payment-services-active");
    add_deleteRightPadding();
});
