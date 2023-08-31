# Multiple dimensional arrays
## Packed vs Unpacked
In SystemVerilog, packed and unpacked arrays are used to represent different types of data storage.  
Packed arrays store data in a compact, contiguous block of memory, while unpacked arrays store data in separate, non-contiguous memory locations.  
Commonly Packed arrays are used when your signal is treated as a single element, while unpacked arrays are useful for storing arrays of a elements.  
Two signals may be the same number of bits, but they are not the same "shape".  

For example, the following code declares a packed,unpacked & mixed arrays of 4 bits:  
```systemverilog
// Packed array declaration
logic [3:0] packed_array;
// Unpacked array declaration
logic unpacked_array [3:0];
//mixed packed and unpacked array declaration:
logic [1:0] array_c [1:0];
```
`array_a` is a packed array of 4 bits, while `array_b` is an unpacked array of 4 bits.  
The mixed array `array_c` is a two-dimensional array where each element is a packed array of 2 bits.

To assign values between a packed and an unpacked array, you need to explicitly access the bits of the packed array.  
This is because packed and unpacked arrays have different storage formats, and the bits of a packed array may be arranged in a different order than the bits of an unpacked array.  
For example, to assign the values of array_b to array_a, you can use a for loop to access each bit of the arrays and assign the values one by one:  
```systemverilog
always_comb begin
  for(int i = 0; i < 4; i++) begin
    array_a[i] = array_b[i];
  end
end
```

To assign values from a mixed array to a packed array, you can use concatenation to combine the bits from the elements of the mixed array to match the correct "shape" of the packed array:  

```systemverilog
assign packed_array = {array_c[1][1:0], array_c[0][1:0]};
```
In this example, the bits [1:0] of array_c[1] and array_c[0] are concatenated to form the 4-bit packed array packed_array.

Another example:
```systemverilog
// 8-bit packed array (a single element)
logic [7:0] element_a;
logic [7:0] element_b;
logic [7:0] element_c;
logic [7:0] element_d;

// unpacked array_1d with 10 elements. each element is 8-bit
logic [7:0] array_1d [9:0]
// unpacked array_2d with 10x10=100 elements. each element is 8-bit
logic [7:0] array_2d [9:0][9:0];

// ====== Example for legal assignments =====
// assign an Element from the array to the entr
assign element_a = array_2d[0][0];

// assign element_b to array_2d to a specific entry
assign array_2d[1][2] = element_b;

// assign a row to the 1d array from the 2d array
assign array_1d = array_2d[3];
//same as: assign array_1d[9:0] = array_2d[3][9:0];

// assign a column to the 1d array from the 2d array 
/// Note this wont work: "assign array_1d[9:0] = array_2d[9:0][5];"
always_comb begin
  for(int i=0; i< 10; i++) begin
    array_1d[i] = array_2d[i][5];
  end//for
end

// Can access a specific bit from the element in the array
logic [1:0] specific_bits;
// Example "array_2d[7][5][3:2]"
// unpacked: [7]-row, [5]-col
// packed [3:0]- specific bits from the element
assign specific_bits[1:0] = array_2d[7][5][3:2]; 

//Note: the order of the brackets are:
// 1. access the unpacked (left to right)
// 2. access the packed (left to right)
logic [3:0][7:0] mixed_example [31:0][95:0];
//accessing the MSB of this multi-dimensional array:
assign the_msb = mixed_example[31][95][3][7];
```

## structs & multi-dimensional arrays
systemverilog Structs can also be used to create multi-dimensional arrays.
May be packed or unpacked. and me a vector of any struct type.

