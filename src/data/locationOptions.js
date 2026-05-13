export const OTHER_OPTION = "Other";

export const COUNTRY_OPTIONS = [
  "United States",
  "Canada",
  "China",
  "United Kingdom",
  "Australia",
  "Mexico",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  OTHER_OPTION
];

export const REGION_OPTIONS_BY_COUNTRY = {
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "Washington, DC",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    OTHER_OPTION
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
    OTHER_OPTION
  ],
  China: [
    "Anhui",
    "Beijing",
    "Chongqing",
    "Fujian",
    "Gansu",
    "Guangdong",
    "Guangxi",
    "Guizhou",
    "Hainan",
    "Hebei",
    "Heilongjiang",
    "Henan",
    "Hong Kong",
    "Hubei",
    "Hunan",
    "Inner Mongolia",
    "Jiangsu",
    "Jiangxi",
    "Jilin",
    "Liaoning",
    "Macau",
    "Ningxia",
    "Qinghai",
    "Shaanxi",
    "Shandong",
    "Shanghai",
    "Shanxi",
    "Sichuan",
    "Taiwan",
    "Tianjin",
    "Tibet",
    "Xinjiang",
    "Yunnan",
    "Zhejiang",
    OTHER_OPTION
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
    "East Midlands",
    "East of England",
    "London",
    "North East England",
    "North West England",
    "South East England",
    "South West England",
    "West Midlands",
    "Yorkshire and the Humber",
    OTHER_OPTION
  ],
  Australia: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
    OTHER_OPTION
  ]
};

export const CITY_OPTIONS_BY_COUNTRY_REGION = {
  "United States": {
    Wisconsin: [
      "Madison",
      "Middleton",
      "Verona",
      "Fitchburg",
      "Sun Prairie",
      "Monona",
      "Milwaukee",
      "Green Bay",
      "La Crosse",
      "Eau Claire",
      OTHER_OPTION
    ],
    Illinois: ["Chicago", "Rockford", "Springfield", "Evanston", OTHER_OPTION],
    Iowa: ["Des Moines", "Iowa City", "Cedar Rapids", "Dubuque", OTHER_OPTION],
    Michigan: ["Detroit", "Ann Arbor", "Grand Rapids", "Lansing", OTHER_OPTION],
    Minnesota: ["Minneapolis", "Saint Paul", "Duluth", "Rochester", OTHER_OPTION],
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", OTHER_OPTION],
    Colorado: ["Denver", "Boulder", "Colorado Springs", "Fort Collins", OTHER_OPTION],
    "New York": ["New York City", "Albany", "Buffalo", "Rochester", OTHER_OPTION],
    Oregon: ["Portland", "Eugene", "Bend", "Salem", OTHER_OPTION],
    Washington: ["Seattle", "Spokane", "Tacoma", "Olympia", OTHER_OPTION],
    "Washington, DC": ["Washington", OTHER_OPTION]
  },
  Canada: {
    Alberta: ["Calgary", "Edmonton", "Banff", OTHER_OPTION],
    "British Columbia": ["Vancouver", "Victoria", "Whistler", OTHER_OPTION],
    Ontario: ["Toronto", "Ottawa", "Hamilton", OTHER_OPTION],
    Quebec: ["Montreal", "Quebec City", "Gatineau", OTHER_OPTION]
  },
  China: {
    Beijing: ["Beijing", OTHER_OPTION],
    Shanghai: ["Shanghai", OTHER_OPTION],
    Guangdong: ["Guangzhou", "Shenzhen", "Zhuhai", OTHER_OPTION],
    Sichuan: ["Chengdu", "Leshan", "Mianyang", OTHER_OPTION],
    Yunnan: ["Kunming", "Dali", "Lijiang", OTHER_OPTION],
    Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou", OTHER_OPTION],
    "Hong Kong": ["Hong Kong", OTHER_OPTION],
    Macau: ["Macau", OTHER_OPTION]
  },
  "United Kingdom": {
    England: ["London", "Manchester", "Bristol", "Liverpool", OTHER_OPTION],
    Scotland: ["Edinburgh", "Glasgow", "Inverness", OTHER_OPTION],
    Wales: ["Cardiff", "Swansea", "Bangor", OTHER_OPTION],
    "Northern Ireland": ["Belfast", "Derry", OTHER_OPTION]
  },
  Australia: {
    "Australian Capital Territory": ["Canberra", OTHER_OPTION],
    "New South Wales": ["Sydney", "Newcastle", "Blue Mountains", OTHER_OPTION],
    Queensland: ["Brisbane", "Cairns", "Gold Coast", OTHER_OPTION],
    Tasmania: ["Hobart", "Launceston", OTHER_OPTION],
    Victoria: ["Melbourne", "Geelong", OTHER_OPTION],
    "Western Australia": ["Perth", "Fremantle", OTHER_OPTION]
  }
};

export function getRegionOptions(country) {
  return REGION_OPTIONS_BY_COUNTRY[country] || [];
}

export function getCityOptions(country, region) {
  return CITY_OPTIONS_BY_COUNTRY_REGION[country]?.[region] || [];
}

export function isSupportedCountry(country) {
  return Boolean(REGION_OPTIONS_BY_COUNTRY[country]);
}
