package easy;

import java.util.Arrays;

public class MergeSortedArray_88 {
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,0,0,0};
        int[] nums2 = {2,5,6};
        int m = 3;
        int n = 3;
        merge(nums1,m,nums2,n);
    }
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        boolean justMerge = false;
        outer:
        for (int i = 0; i < n; i++) {
            for (int j = m-1; j >= 0; j--) {
                if(nums2[0] > nums1[m-1]){
                    justMerge = true;
                }
                if(nums2[i] >= nums1[j] && !justMerge){
                    nums1[j+2] = nums1[j+1];
                    nums1[j+1] = nums2[i];
                    m++;
                    break;
                }
                if(justMerge) {
                    break outer;
                }
            }
        }
        


        int temp;
        for (int i = 0; i < nums1.length; i++) {
            for (int j = i + 1; j < nums1.length; j++) {
                if (nums1[i] > nums1[j])
                {
                    temp = nums1[i];
                    nums1[i] = nums1[j];
                    nums1[j] = temp;
                }
            }
        }
        Arrays.stream(nums1).forEach(System.out::print);
    }
}
