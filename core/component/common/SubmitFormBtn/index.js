export default function SubmitFormBtn({ name, onClick, disabled, className, stepperBtn }) {
  return (
    <>
      <button
        type='button'
        disabled={disabled}
        onClick={onClick}
        className={
          !className
            ? disabled
              ? 'bg-[#E6ECF1] cursor-pointer py-4 px-8 text-white  text-[16px] rounded-lg hover:bg-[#E6ECF1] hover:border-[#E6ECF1]  hover:border border hover:text-white font-[500] duration-300 max-[479px]:w-full'
              : 'bg-[#49D49D] py-4 px-8 text-[#212529]  text-[16px] rounded-lg hover:bg-white hover:border-[#49D49D]  hover:border border hover:text-[#212529] font-[500] duration-300 max-[479px]:w-full'
            : className
        }>
        {name}
      </button>
    </>
  )
}
