const Footer = () => {
  return (
    <div className="bg-[var(--dark-blue)] md:pt-[4rem] pt-[2rem]">
      <div className="text-white md:px-[3rem] px-[2rem] md:pb-[4rem] pb-[2rem] flex flex-col md:flex-row items-start gap-[2rem] md:gap-0 border-b-[1px] border-[var(--white)]">
        <div className="flex gap-[5rem] items-start flex-grow-[5] flex-col md:flex-row">
            {/* logo section  */}
          <div className="flex flex-col items-start gap-[1.5rem]">
            <div className="w-[125px]">
              <img src="./Logo-light.png" alt="logo" />
            </div>
            <h3 className="text-[var(--white)] text-[18px] md:text-[25px]">
              Your Health, Just One Click Away
            </h3>
          </div>
          {/* contact section  */}
          <div className="md:mt-0 mt-[1rem]">
            <h3 className="text-[16px] md:text-[20px] font-medium mb-[0.5rem]">Contact us:</h3>
            <div className="phone">
              <span className="text-[14px] md:text-[20px]">Phone: </span>
              <span className="text-[14px] md:text-[20px]">0943779128</span>
            </div>
            <div className="email">
              <span className="text-[14px] md:text-[20px]">Email: </span>
              <span className="text-[14px] md:text-[20px] break-all">kendawassel14@gmail.com</span>
            </div>
          </div>
        </div>
        {/* social media section  */}
        <div className="flex-grow-[2] md:mt-0 mt-[1rem] w-full md:w-auto">
          <h3 className="text-[16px] md:text-[20px] font-medium mb-[0.5rem]">Social Media:</h3>
          <div className="icons flex gap-[1rem] items-center">
            <div className="insta">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_20504)">
                  <rect
                    width="24"
                    height="24"
                    transform="translate(0.294922)"
                    fill="black"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M12.2949 2.163C15.4989 2.163 15.8789 2.175 17.1449 2.233C20.3969 2.381 21.9159 3.924 22.0639 7.152C22.1219 8.417 22.1329 8.797 22.1329 12.001C22.1329 15.206 22.1209 15.585 22.0639 16.85C21.9149 20.075 20.3999 21.621 17.1449 21.769C15.8789 21.827 15.5009 21.839 12.2949 21.839C9.09092 21.839 8.71092 21.827 7.44592 21.769C4.18592 21.62 2.67492 20.07 2.52692 16.849C2.46892 15.584 2.45692 15.205 2.45692 12C2.45692 8.796 2.46992 8.417 2.52692 7.151C2.67592 3.924 4.19092 2.38 7.44592 2.232C8.71192 2.175 9.09092 2.163 12.2949 2.163ZM12.2949 0C9.03592 0 8.62792 0.014 7.34792 0.072C2.98992 0.272 0.567922 2.69 0.367922 7.052C0.308922 8.333 0.294922 8.741 0.294922 12C0.294922 15.259 0.308922 15.668 0.366922 16.948C0.566922 21.306 2.98492 23.728 7.34692 23.928C8.62792 23.986 9.03592 24 12.2949 24C15.5539 24 15.9629 23.986 17.2429 23.928C21.5969 23.728 24.0249 21.31 24.2219 16.948C24.2809 15.668 24.2949 15.259 24.2949 12C24.2949 8.741 24.2809 8.333 24.2229 7.053C24.0269 2.699 21.6059 0.273 17.2439 0.073C15.9629 0.014 15.5539 0 12.2949 0ZM12.2949 5.838C8.89192 5.838 6.13292 8.597 6.13292 12C6.13292 15.403 8.89192 18.163 12.2949 18.163C15.6979 18.163 18.4569 15.404 18.4569 12C18.4569 8.597 15.6979 5.838 12.2949 5.838ZM12.2949 16C10.0859 16 8.29492 14.21 8.29492 12C8.29492 9.791 10.0859 8 12.2949 8C14.5039 8 16.2949 9.791 16.2949 12C16.2949 14.21 14.5039 16 12.2949 16ZM18.7009 4.155C17.9049 4.155 17.2599 4.8 17.2599 5.595C17.2599 6.39 17.9049 7.035 18.7009 7.035C19.4959 7.035 20.1399 6.39 20.1399 5.595C20.1399 4.8 19.4959 4.155 18.7009 4.155Z"
                    fill="#F2F2F2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_20504">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.294922)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="facebook">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8948 11.9999C21.8948 6.6974 17.5973 2.3999 12.2948 2.3999C6.99232 2.3999 2.69482 6.6974 2.69482 11.9999C2.69482 16.4999 5.79607 20.2799 9.97732 21.3187V14.9324H7.99732V11.9999H9.97732V10.7362C9.97732 7.4699 11.4548 5.9549 14.6648 5.9549C15.2723 5.9549 16.3223 6.0749 16.7536 6.1949V8.8499C16.5286 8.8274 16.1348 8.8124 15.6436 8.8124C14.0686 8.8124 13.4611 9.40865 13.4611 10.9574V11.9999H16.5961L16.0561 14.9324H13.4573V21.5287C18.2123 20.9549 21.8948 16.9087 21.8948 11.9999Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
            <div className="linkedin">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_20507)">
                  <rect
                    width="24"
                    height="24"
                    transform="translate(0.294922)"
                    fill="black"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M19.2949 0H5.29492C2.53392 0 0.294922 2.239 0.294922 5V19C0.294922 21.761 2.53392 24 5.29492 24H19.2949C22.0569 24 24.2949 21.761 24.2949 19V5C24.2949 2.239 22.0569 0 19.2949 0ZM8.29492 19H5.29492V8H8.29492V19ZM6.79492 6.732C5.82892 6.732 5.04492 5.942 5.04492 4.968C5.04492 3.994 5.82892 3.204 6.79492 3.204C7.76092 3.204 8.54492 3.994 8.54492 4.968C8.54492 5.942 7.76192 6.732 6.79492 6.732ZM20.2949 19H17.2949V13.396C17.2949 10.028 13.2949 10.283 13.2949 13.396V19H10.2949V8H13.2949V9.765C14.6909 7.179 20.2949 6.988 20.2949 12.241V19Z"
                    fill="#F2F2F2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_20507">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.294922)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-white py-[0.5rem] md:px-[3rem] px-[2rem]">
        <span className="text-[12px] md:text-[14px] font-medium">© 2025 Healix. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
