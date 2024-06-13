"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

// const API_URL = "https://api.fake-rest.refine.dev";

const API_URL = "https://real-estate-agency-rest-api.onrender.com/api/v1";

export const dataProvider = dataProviderSimpleRest(API_URL);
