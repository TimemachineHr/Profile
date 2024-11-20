import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FiPlus as Plus, FiMinus as Minus } from "react-icons/fi";

const currencySymbols = {
  USD: "$",
  SGD: "S$",
  INR: "₹",
  JPY: "¥",
  AED: "د.إ",
  AUD: "A$",
  BDT: "৳",
  BRL: "R$",
  CAD: "C$",
  CHF: "CHF",
  CLP: "$",
  CNY: "¥",
  COP: "$",
  CZK: "Kč",
  DKK: "kr",
  EUR: "€",
  GBP: "£",
  HKD: "HK$",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  KRW: "₩",
  KZT: "₸",
  MYR: "RM",
  NOK: "kr",
  NZD: "NZ$",
  PHP: "₱",
  PLN: "zł",
  RUB: "₽",
  SAR: "﷼",
  SEK: "kr",
};

const Earning = ({ data, setData }) => {
  const [formState, setFormState] = useState({
    basicPay: data?.basicPay || "",
    paymentType: data?.paymentType || "",
    paymentMode: data?.paymentMode || "",
    frequency: data?.frequency || "",
    payBasis: data?.payBasis || "",
    hourlyRate: data?.hourlyRate || "",
    dailyRate: data?.dailyRate || "",
    salaryAdvance: data?.salaryAdvance || false,
    incrementalPay: data?.incrementalPay || false,
    ordinaryWages: data?.ordinaryWages || [
      { title: "", amount: "", cpfApplicable: false, taxApplicable: false },
    ],
    additionalWages: data?.additionalWages || [
      { title: "", amount: "", cpfApplicable: false, taxApplicable: false },
    ],
  });

  useEffect(() => {
    setData(formState);
  }, [formState]);

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addOrdinaryWageSection = () => {
    setFormState((prev) => ({
      ...prev,
      ordinaryWages: [
        ...prev.ordinaryWages,
        { title: "", amount: "", cpfApplicable: false, taxApplicable: false },
      ],
    }));
  };

  const removeOrdinaryWageSection = (index) => {
    if (index === formState.ordinaryWages.length - 1) {
      setFormState((prev) => ({
        ...prev,
        ordinaryWages: prev.ordinaryWages.filter((_, i) => i !== index),
      }));
    }
  };

  const updateOrdinaryWage = (index, field, value) => {
    setFormState((prev) => ({
      ...prev,
      ordinaryWages: prev.ordinaryWages.map((wage, i) =>
        i === index ? { ...wage, [field]: value } : wage
      ),
    }));
  };

  const addAdditionalWageSection = () => {
    setFormState((prev) => ({
      ...prev,
      additionalWages: [
        ...prev.additionalWages,
        { title: "", amount: "", cpfApplicable: false, taxApplicable: false },
      ],
    }));
  };

  const removeAdditionalWageSection = (index) => {
    if (index === formState.additionalWages.length - 1) {
      setFormState((prev) => ({
        ...prev,
        additionalWages: prev.additionalWages.filter((_, i) => i !== index),
      }));
    }
  };

  const updateAdditionalWage = (index, field, value) => {
    setFormState((prev) => ({
      ...prev,
      additionalWages: prev.additionalWages.map((wage, i) =>
        i === index ? { ...wage, [field]: value } : wage
      ),
    }));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6 p-6">
        <div className="col-span-1">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Basic Pay
          </label>
          <div className="flex gap-2">
            <select
              value={formState.currency || "USD"}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="w-1/2 h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none appearance-none"
              style={{
                color: formState.currency ? "black" : "rgba(51, 51, 51, 0.8)",
              }}
            >
              {Object.entries(currencySymbols).map(([code, symbol]) => (
                <option key={code} value={code}>
                  {symbol} - {code}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={formState.basicPay}
              onChange={(e) => handleInputChange("basicPay", e.target.value)}
              className="h-11 w-full bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Payment Type
          </label>
          <input
            type="text"
            placeholder="Initial"
            value={formState.paymentType}
            onChange={(e) => handleInputChange("paymentType", e.target.value)}
            className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
          />
        </div>

        <div className="col-span-1 relative">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Payment Mode
          </label>
          <select
            value={formState.paymentMode}
            onChange={(e) => handleInputChange("paymentMode", e.target.value)}
            className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] appearance-none focus:outline-none"
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
          <FiChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={16}
          />
        </div>

        <div className="col-span-1 relative">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Frequency
          </label>
          <select
            value={formState.frequency}
            onChange={(e) => handleInputChange("frequency", e.target.value)}
            className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] appearance-none focus:outline-none"
          >
            <option value="">Select Pay Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="biweekly">Bi-Monthly</option>
          </select>
          <FiChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={16}
          />
        </div>

        <div className="col-span-1 relative">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Pay Basis
          </label>
          <select
            value={formState.payBasis}
            onChange={(e) => handleInputChange("payBasis", e.target.value)}
            className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] appearance-none focus:outline-none"
          >
            <option value="">Select Pay Basis</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
          <FiChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={16}
          />
        </div>

        <div className="col-span-1">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Daily Rate
          </label>
          <div className="flex gap-2">
            <select
              value={formState.currency || "USD"}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="w-1/2 h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none appearance-none"
              style={{
                color: formState.currency ? "black" : "rgba(51, 51, 51, 0.8)",
              }}
            >
              {Object.entries(currencySymbols).map(([code, symbol]) => (
                <option key={code} value={code}>
                  {symbol} - {code}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formState.dailyRate}
              onChange={(e) => handleInputChange("dailyRate", e.target.value)}
              className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Hourly Rate
          </label>
          <div className="flex gap-2">
            <select
              value={formState.currency || "USD"}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="w-1/2 h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none appearance-none"
              style={{
                color: formState.currency ? "black" : "rgba(51, 51, 51, 0.8)",
              }}
            >
              {Object.entries(currencySymbols).map(([code, symbol]) => (
                <option key={code} value={code}>
                  {symbol} - {code}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formState.hourlyRate}
              onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
              className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="flex gap-2 items-center text-[18px] leading-[27px] text-gray-700 text-md font-medium">
            <input
              type="checkbox"
              checked={formState.salaryAdvance}
              onChange={(e) =>
                handleInputChange("salaryAdvance", e.target.checked)
              }
              className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
            />
            Salary Advance
          </label>

          {formState.salaryAdvance && (
            <div className="flex gap-2 items-center">
              <select
                value={formState.currency || "USD"}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                className="w-1/2 h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none appearance-none"
                style={{
                  color: formState.currency ? "black" : "rgba(51, 51, 51, 0.8)",
                }}
              >
                {Object.entries(currencySymbols).map(([code, symbol]) => (
                  <option key={code} value={code}>
                    {symbol} - {code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={formState.amount || ""}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="Enter amount"
                className="w-full h-11 bg-white shadow-md rounded-lg px-3 text-gray-700 focus:outline-none"
              />
            </div>
          )}
        </div>

        <div>
          <label className="flex gap-2 items-center text-[18px] leading-[27px] text-gray-700 text-md font-medium">
            <input
              type="checkbox"
              checked={formState.incrementalPay}
              onChange={(e) =>
                handleInputChange("incrementalPay", e.target.checked)
              }
              className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
            />
            Incremental Pay
          </label>

          {formState.incrementalPay && (
            <div className="flex gap-2 items-center w-full">
              <select
                value={formState.currency || "USD"}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none appearance-none"
                style={{
                  color: formState.currency ? "black" : "rgba(51, 51, 51, 0.8)",
                }}
              >
                {Object.entries(currencySymbols).map(([code, symbol]) => (
                  <option key={code} value={code}>
                    {symbol} - {code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={formState.incrementalPaycurrencyamount || ""}
                onChange={(e) =>
                  handleInputChange(
                    "incrementalPaycurrencyamount",
                    e.target.value
                  )
                }
                placeholder="Enter amount"
                className="w-full h-11 bg-white shadow-md rounded-lg px-3 text-gray-700 focus:outline-none"
              />
              <input
                type="date"
                value={formState.selectedDate || ""}
                onChange={(e) =>
                  handleInputChange("selectedDate", e.target.value)
                }
                className="w-full h-11 bg-white shadow-md rounded-lg px-3 text-gray-700 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Other Ordinary Wages (If Any)
          </label>
          {formState.ordinaryWages.map((wage, index) => (
            <div key={index} className="flex gap-8 items-center mt-2">
              <div className="w-1/3">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={wage.title}
                  onChange={(e) =>
                    updateOrdinaryWage(index, "title", e.target.value)
                  }
                  className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
                />
              </div>
              <div className="w-1/3">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  value={wage.amount}
                  onChange={(e) =>
                    updateOrdinaryWage(index, "amount", e.target.value)
                  }
                  className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2 mr-2">
                  CPF Applicable
                </label>
                <input
                  type="checkbox"
                  checked={wage.cpfApplicable}
                  onChange={(e) =>
                    updateOrdinaryWage(index, "cpfApplicable", e.target.checked)
                  }
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2 mr-2">
                  TAX Applicable
                </label>
                <input
                  type="checkbox"
                  checked={wage.taxApplicable}
                  onChange={(e) =>
                    updateOrdinaryWage(index, "taxApplicable", e.target.checked)
                  }
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                />
              </div>
              <div className="flex items-center">
                {index === formState.ordinaryWages.length - 1 && (
                  <button
                    type="button"
                    className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={addOrdinaryWageSection}
                  >
                    <Plus size={16} />
                  </button>
                )}

                {formState.ordinaryWages.length > 1 &&
                  index === formState.ordinaryWages.length - 1 && (
                    <button
                      type="button"
                      className="p-1 ml-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => removeOrdinaryWageSection(index)}
                    >
                      <Minus size={16} />
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Additional Wages (If Any)
          </label>
          {formState.additionalWages.map((wage, index) => (
            <div key={index} className="flex gap-8 items-center mt-2">
              <div className="w-1/3">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={wage.title}
                  onChange={(e) =>
                    updateAdditionalWage(index, "title", e.target.value)
                  }
                  className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal  text-[rgba(51,51,51,0.8)] focus:outline-none"
                />
              </div>
              <div className="w-1/3">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  value={wage.amount}
                  onChange={(e) =>
                    updateAdditionalWage(index, "amount", e.target.value)
                  }
                  className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] focus:outline-none"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2 mr-2">
                  CPF Applicable
                </label>
                <input
                  type="checkbox"
                  checked={wage.cpfApplicable}
                  onChange={(e) =>
                    updateAdditionalWage(
                      index,
                      "cpfApplicable",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2 mr-2">
                  TAX Applicable
                </label>
                <input
                  type="checkbox"
                  checked={wage.taxApplicable}
                  onChange={(e) =>
                    updateAdditionalWage(
                      index,
                      "taxApplicable",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                />
              </div>
              <div className="flex items-center">
                {index === formState.additionalWages.length - 1 && (
                  <button
                    type="button"
                    className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={addAdditionalWageSection}
                  >
                    <Plus size={16} />
                  </button>
                )}

                {formState.additionalWages.length > 1 &&
                  index === formState.additionalWages.length - 1 && (
                    <button
                      type="button"
                      className="p-1 ml-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => removeAdditionalWageSection(index)}
                    >
                      <Minus size={16} />
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
};
export default Earning;
