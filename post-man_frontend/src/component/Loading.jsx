import React from 'react'

function Loading() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>
                    {`
        .spinner_hzlK {
          animation: spinner_vc4H 0.8s linear infinite;
          animation-delay: -0.8s;
        }
        .spinner_koGT {
          animation-delay: -0.65s;
        }
        .spinner_YF1u {
          animation-delay: -0.5s;
        }
        @keyframes spinner_vc4H {
          0% { y: 1px; height: 22px; }
          93.75% { y: 5px; height: 14px; opacity: 0.2; }
        }
      `}
                </style>
                <rect className="spinner_hzlK" x="1" y="1" width="6" height="22" />
                <rect className="spinner_hzlK spinner_koGT" x="9" y="1" width="6" height="22" />
                <rect className="spinner_hzlK spinner_YF1u" x="17" y="1" width="6" height="22" />
            </svg>
        </div>
    )
}

export default Loading