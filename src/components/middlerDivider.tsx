import Image from 'next/image';

const MiddleDivider = () => {
  return (
    // Added px-4 for some padding on very small screens to prevent the image from touching the edges.
    <div className="flex justify-center items-center w-full">
      <Image
        src="/images/middle divider.png"
        alt="Page section divider with floral elements"
        width={891}
        height={248}
        // --- Responsive Styling ---
        // w-full: Makes the image scale with its container's width.
        // max-w-[891px]: Sets the maximum width to the image's original width. 
        //                On larger screens, it won't stretch beyond this.
        //                On smaller screens, `w-full` will cause it to shrink proportionally.
        // h-auto: Ensures the height adjusts automatically to maintain the aspect ratio.
        className="w-full max-w-[445px] h-auto" 
      />
    </div>
  );
};

export default MiddleDivider;
