const programTypeChoosers = document.querySelectorAll(
  ".js-program-type-chooser"
);

function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

if (programTypeChoosers) {
  const submitBtn = document.querySelector("form *[type='submit']");
  const controls = document.querySelectorAll(".js-program-type-value");

  const monetaryControl = document.querySelector("#monetary_sum");

  const MAXVALUE = monetaryControl
    ? monetaryControl.getAttribute("max")
    : 10000000;
  const MINVALUE = monetaryControl
    ? monetaryControl.getAttribute("min")
    : 10000;
  const STEP = monetaryControl ? monetaryControl.getAttribute("step") : 5000;
  monetaryControl ? monetaryControl.setAttribute("value", MINVALUE) : null;

  let totalPrice = MINVALUE;
  const totalPriceNode = document.querySelector(".presentation__total-sum");

  totalPriceNode.textContent = priceFormat(totalPrice);

  const calculatePrice = (evt) => {
    const target = evt.target;

    if (target.getAttribute("type") === "checkbox") {
      if (target.checked) {
        totalPrice += parseInt(target.value);
      } else {
        totalPrice -= parseInt(target.value);
      }
      totalPriceNode.textContent = priceFormat(totalPrice);

      disableSubmitBtn(totalPrice);
    } else {
      if (parseInt(target.value) > MAXVALUE) {
        target.value = MAXVALUE;
        totalPriceNode.textContent = priceFormat(MAXVALUE);
      } else {
        totalPriceNode.textContent = priceFormat(parseInt(target.value));
      }

      disableSubmitBtn(parseInt(target.value));
    }
  };

  const disableControls = () => {
    controls.forEach((ctrl) => {
      ctrl.setAttribute("disabled", true);
    });
  };

  const init = (field) => {
    const controls = field.querySelectorAll(".js-program-type-value");
    totalPrice = 0;
    totalPriceNode.textContent = priceFormat(totalPrice);

    controls.forEach((ctrl) => {
      ctrl.hasAttribute("disabled", true)
        ? ctrl.removeAttribute("disabled")
        : null;

      if (ctrl.getAttribute("type") === "checkbox") {
        if (ctrl.checked) {
          totalPrice += parseInt(ctrl.value);
        }
      } else {
        totalPrice += parseInt(ctrl.value);
      }
    });

    totalPriceNode.textContent = priceFormat(totalPrice);

    disableSubmitBtn(totalPrice);
  };

  const disableSubmitBtn = (totalPrice) => {
    if (totalPrice === 0) {
      !submitBtn.hasAttribute("disabled")
        ? submitBtn.setAttribute("disabled", true)
        : null;
    } else {
      submitBtn.hasAttribute("disabled")
        ? submitBtn.removeAttribute("disabled", true)
        : null;
    }
  };

  const onProgramTypeChangeHandler = (evt) => {
    const target = evt.target;

    disableControls();
    init(target.closest("fieldset"));
  };

  programTypeChoosers.forEach((elem) => {
    elem.addEventListener("click", onProgramTypeChangeHandler);
  });

  const correctTotalPrice = (evt) => {
    const target = evt.target;
    target.value = parseInt(target.value) - (parseInt(target.value) % STEP);

    if (parseInt(target.value) < MINVALUE) {
      target.value = MINVALUE;
    }
    totalPriceNode.textContent = priceFormat(parseInt(target.value));

    disableSubmitBtn(totalPrice);
  };

  controls.forEach((ctrl) => {
    if (ctrl.getAttribute("type") !== "checkbox") {
      ctrl.addEventListener("input", calculatePrice);
      ctrl.addEventListener("change", correctTotalPrice);
    } else {
      ctrl.addEventListener("change", calculatePrice);
    }
  });

  disableSubmitBtn(totalPrice);
}
