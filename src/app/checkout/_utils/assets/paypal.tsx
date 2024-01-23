import { cn } from "@/lib/utils";

const PayPal = ({ className }: { className: string }) => {
  return (
    <svg
      width="98"
      height="27"
      viewBox="0 0 98 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        d="M92.5462 1.20881L89.2657 21.7694C89.2534 21.8449 89.2578 21.9222 89.2787 21.9958C89.2995 22.0694 89.3362 22.1376 89.3862 22.1956C89.4362 22.2535 89.4983 22.2999 89.5682 22.3314C89.6381 22.3629 89.714 22.3788 89.7907 22.3779H93.673C93.81 22.3791 93.9428 22.3312 94.0475 22.2431C94.1522 22.155 94.2218 22.0324 94.2437 21.8975L97.5242 1.33687C97.5365 1.26137 97.5321 1.18411 97.5113 1.11049C97.4905 1.03687 97.4538 0.968685 97.4037 0.91071C97.3537 0.852735 97.2916 0.806375 97.2217 0.774878C97.1519 0.743382 97.0759 0.727512 96.9993 0.728382H93.1169C92.9796 0.72567 92.8459 0.772929 92.7408 0.861335C92.6358 0.949741 92.5666 1.07325 92.5462 1.20881ZM88.4006 7.20888H84.717C84.5802 7.20754 84.4474 7.2552 84.3429 7.34321C84.2383 7.43122 84.1688 7.55373 84.1471 7.68849L84.0253 8.44543C84.0253 8.44543 81.1642 5.35078 76.0987 7.44216C73.1927 8.63956 71.7978 11.1135 71.2042 12.9259C71.2042 12.9259 69.3202 18.4341 73.5811 21.466C73.5811 21.466 77.5321 24.382 81.9811 21.2865L81.9042 21.7694C81.8864 21.8828 81.9064 21.999 81.961 22.1C82.0156 22.2011 82.102 22.2815 82.2068 22.3289C82.2763 22.3616 82.3523 22.3779 82.4292 22.3779H86.1152C86.2526 22.3806 86.3863 22.3333 86.4913 22.2449C86.5963 22.1565 86.6655 22.033 86.686 21.8975L88.928 7.81737C88.9406 7.74195 88.9361 7.6647 88.9151 7.5912C88.894 7.5177 88.8568 7.44979 88.8062 7.3924C88.7562 7.33392 88.694 7.2871 88.624 7.25524C88.5539 7.22339 88.4776 7.2081 88.4006 7.20888ZM82.9803 14.9904C82.8366 15.9741 82.3379 16.8718 81.578 17.5149C80.8147 18.1603 79.8434 18.5088 78.8429 18.4961C78.4505 18.5007 78.0598 18.444 77.685 18.3281C76.0947 17.8224 75.187 16.3101 75.4479 14.6706C75.5927 13.6873 76.0919 12.7904 76.8518 12.1478C77.6144 11.502 78.585 11.1524 79.5853 11.1632C79.9777 11.1592 80.3684 11.2164 80.7431 11.3329C82.3433 11.8354 83.2468 13.3501 82.9844 14.9912H82.9803V14.9904ZM63.3104 15.3794C65.3079 15.3794 67.2401 14.6714 68.7577 13.3843C70.2721 12.1015 71.2748 10.3192 71.5836 8.36142C72.2287 4.28878 69.0161 0.734092 64.4616 0.734092H57.1247C56.9877 0.732781 56.8549 0.780561 56.7503 0.868735C56.6457 0.956908 56.5763 1.07961 56.5547 1.21452L53.2734 21.7751C53.2556 21.8885 53.2756 22.0047 53.3302 22.1057C53.3848 22.2068 53.4712 22.2872 53.576 22.3347C53.6463 22.3673 53.7215 22.3836 53.7984 22.3836H57.6831C57.8201 22.3849 57.9529 22.3371 58.0575 22.249C58.1621 22.1608 58.2315 22.0381 58.253 21.9032L59.2163 15.8656C59.2365 15.7299 59.3056 15.6062 59.4107 15.5176C59.5157 15.429 59.6495 15.3816 59.787 15.3843L63.3104 15.3794ZM66.5598 8.17626C66.3202 9.68199 65.1444 10.7905 62.895 10.7905H60.0192L60.8925 5.31489H63.7167C66.0422 5.31897 66.7994 6.67706 66.5598 8.18034V8.17626Z"
        fill="#6B7280"
      />
      <path
        d="M48.8473 7.55797L44.404 14.9846L42.1489 7.61262C42.1136 7.49497 42.0409 7.39196 41.9418 7.31913C41.8427 7.2463 41.7225 7.2076 41.5994 7.20886H37.5896C37.4858 7.20746 37.3851 7.24351 37.3059 7.31036C37.2267 7.37722 37.1744 7.47037 37.1586 7.57265C37.1489 7.64046 37.1559 7.70963 37.1791 7.77412L41.22 20.1919L37.565 26.0435C37.534 26.0917 37.5132 26.1456 37.5038 26.2021C37.4944 26.2586 37.4966 26.3164 37.5104 26.372C37.5242 26.4276 37.5492 26.4798 37.5839 26.5254C37.6186 26.571 37.6622 26.6091 37.7122 26.6373C37.7791 26.6756 37.855 26.6953 37.9322 26.6944H42.2511C42.3744 26.6948 42.4956 26.6635 42.6032 26.6035C42.7108 26.5435 42.801 26.4568 42.8652 26.3518L54.1523 7.86303C54.1932 7.79865 54.2157 7.72433 54.2173 7.64813C54.2189 7.57192 54.1995 7.49674 54.1613 7.43072C54.1232 7.36448 54.068 7.30964 54.0014 7.27192C53.9348 7.23419 53.8593 7.21495 53.7827 7.2162H49.4654C49.3416 7.21507 49.2195 7.24595 49.1112 7.30584C49.0029 7.36574 48.9119 7.4526 48.8473 7.55797ZM35.3164 7.20886H31.6295C31.4924 7.20755 31.3593 7.25542 31.2546 7.34374C31.1498 7.43207 31.0804 7.55498 31.0588 7.69011L30.9394 8.44623C30.9394 8.44623 28.0759 5.35158 23.0105 7.44296C20.1053 8.64036 18.7095 11.1143 18.1183 12.9267C18.1183 12.9267 16.2328 18.4349 20.4929 21.4668C20.4929 21.4668 24.4447 24.3828 28.8936 21.2873L28.8168 21.7702C28.7987 21.8837 28.8185 21.9999 28.8732 22.101C28.9278 22.2021 29.0143 22.2825 29.1193 22.3297C29.1888 22.3624 29.2648 22.3787 29.3417 22.3787H33.0278C33.1646 22.3797 33.2973 22.3318 33.4018 22.2436C33.5063 22.1555 33.5758 22.033 33.5977 21.8983L35.8406 7.81817C35.8588 7.70458 35.8391 7.58816 35.7844 7.48687C35.7297 7.38559 35.6431 7.30509 35.538 7.2578C35.4683 7.22577 35.3932 7.20908 35.3164 7.20886ZM29.8953 14.992C29.7502 15.9745 29.2514 16.8708 28.4921 17.5132C27.7293 18.1586 26.7588 18.5079 25.7587 18.4969C25.3668 18.5013 24.9768 18.4446 24.6025 18.3289C23.0129 17.8232 22.1061 16.3109 22.367 14.6706C22.5122 13.6852 23.0132 12.7866 23.7758 12.1437C24.5413 11.4979 25.515 11.15 26.5175 11.164C26.9099 11.16 27.3016 11.2171 27.6761 11.3337C29.2599 11.8362 30.1618 13.35 29.9002 14.992H29.8953ZM10.2262 15.3802C12.2204 15.3792 14.1493 14.6712 15.6686 13.3827C17.1816 12.0999 18.1832 10.3182 18.4912 8.3614C19.1372 4.28958 15.9237 0.734892 11.3709 0.734892H4.03311C3.8962 0.733524 3.76334 0.78116 3.65862 0.869157C3.55391 0.957154 3.48428 1.07968 3.46238 1.21451L0.191693 21.7694C0.173418 21.883 0.193144 21.9994 0.247826 22.1007C0.302508 22.202 0.389103 22.2825 0.494231 22.3297C0.563733 22.3616 0.639776 22.3787 0.716637 22.3787H4.59894C4.7361 22.38 4.86916 22.3321 4.97391 22.2438C5.07866 22.1555 5.14813 22.0326 5.16968 21.8974L6.13126 15.8599C6.15169 15.7243 6.22087 15.6008 6.3259 15.5124C6.43092 15.424 6.5646 15.3767 6.702 15.3794L10.2262 15.3802ZM13.4756 8.17625C13.236 9.68197 12.061 10.7905 9.8116 10.7905H6.93585L7.80749 5.31488H10.6317C12.958 5.31895 13.7144 6.67786 13.4756 8.18032V8.17625Z"
        fill="#6B7280"
      />
    </svg>
  );
};


export default PayPal;