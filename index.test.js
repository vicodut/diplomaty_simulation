const { evaluateActions } = require('./index');

const TESTS_CASES = [
	{
		name: "1: HOLD",
		test: true,
		input: [
	        "A Munich Hold",
	        "B Warsaw Hold"
	    ],
	    output: [
	        "A Munich",
	        "B Warsaw"
	    ]
	},
	{
		name: "2: HOLD & MOVE & SUPPORT",
		test: true,
		input: [
			"A Munich Hold",
			"B Bohemia Move Munich",
			"C Warsaw Support B"
		],
		output: [
			"A [dead]",
			"B Munich",
			"C Warsaw"
		]
	},
	{
		name: "3: Move to another country",
		test: true,
		input: [
			"A Munich Hold",
			"B Warsaw Move Bohemia"
		],
		output: [
			"A Munich",
			"B Bohemia"
		]
	},
	{
		name: "4: Battle & same strength",
		test: true,
		input: [
      "A Munich Hold",
      "B Bohemia Move Munich",
      "C Prussia Move Munich",
      "D Warsaw Hold"
		],
		output: [
			"A [dead]",
			"B [dead]",
			"C [dead]",
			"D Warsaw"
		]
	},
	{
		name: "5: Battle & same strength",
		test: true,
		input: [
      "A Munich Support B",
      "B Bohemia Move Prussia",
      "C Prussia Hold",
      "D Warsaw Move Munich"
		],
		output: [
      "A [dead]",
      "B [dead]",
      "C [dead]",
      "D [dead]"
		]
	},
	{
		name: "6: Move & Remove Support",
		test: true,
		input: [
			"A Munich Support B",
			"B Oakland Move Munich"
		],
		output: [
			"A [dead]",
			"B [dead]"
		]
	},
	{
		name: "7: Battle and Support",
		test: true,
		input: [
			"A Munich Support B",
			"B Bohemia Support C",
			"C Warsaw Support A",
			"D SF Move Munich",
			"E Oakland Move Bohemia",
			"F Burlingame Move Warsaw"
		],
		output: [
			"A [dead]",
			"B [dead]",
			"C [dead]",
			"D [dead]",
			"E [dead]",
			"F [dead]"
		]
	},
	{
		name: "8: Multi Support",
		test: true,
		input: [
			"A Munich Support D",
			"B Bohemia Support D",
			"C Craig Support J",
			"D Prussia Move France",
			"E Warsaw Support I",
			"F Burlingame Support I",
			"G Millbrae Support I",
			"H Frankton Support J",
			"I Clayton Move France",
			"J Michael Move France",
			"K Spain Support D",
			"L Lombard Support I"
		],
		output: [
			"A Munich",
			"B Bohemia",
			"C Craig",
			"D [dead]",
			"E Warsaw",
			"F Burlingame",
			"G Millbrae",
			"H Frankton",
			"I France",
			"J [dead]",
			"K Spain",
			"L Lombard"
		]
	},
	{
		name: "9: One vs Multi",
		test: true,
		input: [
			"Army00000000 Hillsborough00000000 Move Burlingame",
			"Army00000001 Hillsborough00000001 Move Burlingame",
			"Army00000002 Hillsborough00000002 Move Burlingame",
			"Army00000003 Hillsborough00000003 Move Burlingame",
			"Army00000004 Hillsborough00000004 Move Burlingame",
			"Army00000005 Hillsborough00000005 Move Burlingame",
			"Army00000006 Hillsborough00000006 Move Burlingame",
			"Army00000007 Hillsborough00000007 Move Burlingame",
			"Army00000008 Hillsborough00000008 Move Burlingame",
			"Army00000009 Hillsborough00000009 Move Burlingame",
			"Army00000010 Hillsborough00000010 Move Burlingame",
			"Army00000011 Hillsborough00000011 Move Burlingame",
			"Army00000012 Hillsborough00000012 Move Burlingame",
			"B Millbrae Support Army00000010"
		],
		output: [
			"Army00000000 [dead]",
			"Army00000001 [dead]",
			"Army00000002 [dead]",
			"Army00000003 [dead]",
			"Army00000004 [dead]",
			"Army00000005 [dead]",
			"Army00000006 [dead]",
			"Army00000007 [dead]",
			"Army00000008 [dead]",
			"Army00000009 [dead]",
			"Army00000010 Burlingame",
			"Army00000011 [dead]",
			"Army00000012 [dead]",
			"B Millbrae"
		]
	},
	{
		name: "10: One vs Multi 2",
		test: true,
		input: [
			"Army00000000 Hillsborough00000000 Move Burlingame",
			"Army00000001 Hillsborough00000001 Move Burlingame",
			"Army00000002 Hillsborough00000002 Move Burlingame",
			"Army00000003 Hillsborough00000003 Move Burlingame",
			"Army00000004 Hillsborough00000004 Move Burlingame",
			"Army00000005 Hillsborough00000005 Move Burlingame",
			"Army00000006 Hillsborough00000006 Move Burlingame",
			"Army00000007 Hillsborough00000007 Move Burlingame",
			"Army00000008 Hillsborough00000008 Move Burlingame",
			"Army00000009 Hillsborough00000009 Move Burlingame",
			"Army00000010 Hillsborough00000010 Move Burlingame",
			"Army00000011 Hillsborough00000011 Move Burlingame",
			"Army00000012 Hillsborough00000012 Move Burlingame",
			"Army00000013 Hillsborough00000013 Move Burlingame",
			"Army00000014 Hillsborough00000014 Move Burlingame",
			"Army00000015 Hillsborough00000015 Move Burlingame",
			"Army00000016 Hillsborough00000016 Move Burlingame",
			"Army00000017 Hillsborough00000017 Move Burlingame",
			"Army00000018 Hillsborough00000018 Move Burlingame",
			"Army00000019 Hillsborough00000019 Move Burlingame",
			"Army00000020 Hillsborough00000020 Move Burlingame",
			"Army00000021 Hillsborough00000021 Move Burlingame",
			"Army00000022 Hillsborough00000022 Move Burlingame",
			"Army00000023 Hillsborough00000023 Move Burlingame",
			"Army00000024 Hillsborough00000024 Move Burlingame",
			"Army00000025 Hillsborough00000025 Move Burlingame",
			"Army00000026 Hillsborough00000026 Move Burlingame",
			"Army00000027 Hillsborough00000027 Move Burlingame",
			"Army00000028 Hillsborough00000028 Move Burlingame",
			"Army00000029 Hillsborough00000029 Move Burlingame",
			"Army00000030 Hillsborough00000030 Move Burlingame",
			"Army00000031 Hillsborough00000031 Move Burlingame",
			"Army00000032 Hillsborough00000032 Move Burlingame",
			"Army00000033 Hillsborough00000033 Move Burlingame",
			"Army00000034 Hillsborough00000034 Move Burlingame",
			"Army00000035 Hillsborough00000035 Move Burlingame",
			"Army00000036 Hillsborough00000036 Move Burlingame",
			"Army00000037 Hillsborough00000037 Move Burlingame",
			"Army00000038 Hillsborough00000038 Move Burlingame",
			"Army00000039 Hillsborough00000039 Move Burlingame",
			"Army00000040 Hillsborough00000040 Move Burlingame",
			"Army00000041 Hillsborough00000041 Move Burlingame",
			"Army00000042 Hillsborough00000042 Move Burlingame",
			"Army00000043 Hillsborough00000043 Move Burlingame",
			"Army00000044 Hillsborough00000044 Move Burlingame",
			"Army00000045 Hillsborough00000045 Move Burlingame",
			"Army00000046 Hillsborough00000046 Move Burlingame",
			"Army00000047 Hillsborough00000047 Move Burlingame",
			"Army00000048 Hillsborough00000048 Move Burlingame",
			"Army00000049 Hillsborough00000049 Move Burlingame",
			"B Millbrae Support Army00000010"
		],
		output: [
			"Army00000000 [dead]",
			"Army00000001 [dead]",
			"Army00000002 [dead]",
			"Army00000003 [dead]",
			"Army00000004 [dead]",
			"Army00000005 [dead]",
			"Army00000006 [dead]",
			"Army00000007 [dead]",
			"Army00000008 [dead]",
			"Army00000009 [dead]",
			"Army00000010 Burlingame",
			"Army00000011 [dead]",
			"Army00000012 [dead]",
			"Army00000013 [dead]",
			"Army00000014 [dead]",
			"Army00000015 [dead]",
			"Army00000016 [dead]",
			"Army00000017 [dead]",
			"Army00000018 [dead]",
			"Army00000019 [dead]",
			"Army00000020 [dead]",
			"Army00000021 [dead]",
			"Army00000022 [dead]",
			"Army00000023 [dead]",
			"Army00000024 [dead]",
			"Army00000025 [dead]",
			"Army00000026 [dead]",
			"Army00000027 [dead]",
			"Army00000028 [dead]",
			"Army00000029 [dead]",
			"Army00000030 [dead]",
			"Army00000031 [dead]",
			"Army00000032 [dead]",
			"Army00000033 [dead]",
			"Army00000034 [dead]",
			"Army00000035 [dead]",
			"Army00000036 [dead]",
			"Army00000037 [dead]",
			"Army00000038 [dead]",
			"Army00000039 [dead]",
			"Army00000040 [dead]",
			"Army00000041 [dead]",
			"Army00000042 [dead]",
			"Army00000043 [dead]",
			"Army00000044 [dead]",
			"Army00000045 [dead]",
			"Army00000046 [dead]",
			"Army00000047 [dead]",
			"Army00000048 [dead]",
			"Army00000049 [dead]",
			"B Millbrae"
		]
	}
];

for(let test_case of TESTS_CASES) {
	if (test_case.test) {
		test(test_case.name, () => {
		  expect(evaluateActions(test_case.input.sort())).toEqual(test_case.output.sort());
		});
	}
}