import CheckoutNextButton from "@/components/atoms/checkout-next-button";
import Toggler from "@/components/atoms/toggler";

const BillingAddress = () => {
  return (
    <div>
      <form>
        <h2 className="text-[14px] md:text-[16px] font-bold pb-[12px]">
          Billing Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="salutation">Salutation</label>
              <input name="salutation" />
            </div>
            <div className="input-field">
              <label htmlFor="firstname">Firstname</label>
              <input name="firstname" />
            </div>
            <div className="input-field">
              <label htmlFor="lastname">Lastname</label>
              <input name="lastname" />
            </div>
            <div className="input-field">
              <label htmlFor="reference-number">Reference number</label>
              <input name="reference-number" />
            </div>
            <div className="input-field">
              <label htmlFor="telephone-number">Telephone number</label>
              <input name="telephone-number" />
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="street">Street</label>
              <input name="street" />
            </div>
            <div className="input-field">
              <label htmlFor="house-number">House number</label>
              <input name="house-number" />
            </div>
            <div className="input-field">
              <label htmlFor="po-box">P.O. box</label>
              <input name="po-box" />
            </div>
            <div className="input-field">
              <label htmlFor="plz">PLZ</label>
              <input name="plz" />
            </div>
            <div className="input-field">
              <label htmlFor="location">Location</label>
              <input name="location" />
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="message">Your message</label>
              <textarea name="message" className="min-h-[150px]" />
            </div>
            <div className="input-field">
              <label htmlFor="email-address">Email address</label>
              <input name="email-address" />
            </div>
            <div className="input-field">
              <label htmlFor="land">Land</label>
              <input name="land" />
            </div>
          </div>
        </div>
      </form>
      <form className="mt-[32px] border border-secondary p-[10px] rounded-[8px]">
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-[14px] md:text-[16px] font-bold">
            Delivery Address
          </h2>

          <Toggler text="Same as billing address?" textSize="small" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="salutation">Salutation</label>
              <input name="salutation" />
            </div>
            <div className="input-field">
              <label htmlFor="firstname">Firstname</label>
              <input name="firstname" />
            </div>
            <div className="input-field">
              <label htmlFor="lastname">Lastname</label>
              <input name="lastname" />
            </div>
            <div className="input-field">
              <label htmlFor="reference-number">Reference number</label>
              <input name="reference-number" />
            </div>
            <div className="input-field">
              <label htmlFor="telephone-number">Telephone number</label>
              <input name="telephone-number" />
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="street">Street</label>
              <input name="street" />
            </div>
            <div className="input-field">
              <label htmlFor="house-number">House number</label>
              <input name="house-number" />
            </div>
            <div className="input-field">
              <label htmlFor="po-box">P.O. box</label>
              <input name="po-box" />
            </div>
            <div className="input-field">
              <label htmlFor="plz">PLZ</label>
              <input name="plz" />
            </div>
            <div className="input-field">
              <label htmlFor="location">Location</label>
              <input name="location" />
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="input-field">
              <label htmlFor="message">Your message</label>
              <textarea name="message" className="min-h-[150px]" />
            </div>
            <div className="input-field">
              <label htmlFor="email-address">Email address</label>
              <input name="email-address" />
            </div>
            <div className="input-field">
              <label htmlFor="land">Land</label>
              <input name="land" />
            </div>
          </div>
        </div>
      </form>
      <div className="pt-[20px] flex justify-end">
        <CheckoutNextButton variant="both" />
      </div>
    </div>
  );
};

export default BillingAddress;
