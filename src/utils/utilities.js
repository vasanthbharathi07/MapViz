export const parseElectionData = (row) => {
    const columns = row.split(',');

    return {
      state: columns[0].trim(),
      electoralDemocrat: columns[1] || null,
      electoralRepublican: columns[2] || null,
      democratVotes: parseNumber(columns[3]),
      republicanVotes: parseNumber(columns[4]),
      otherVotes: parseNumber(columns[5]),
      totalVotes: parseNumber(columns[6])
    };
  };

  // Utility function to clean up and convert vote counts
  export const parseNumber = (value) => {
    return parseInt(value) || 0;
  };

  export const geoJsonStyleDefault = {
    fillColor: "green",
    color: "black",
    weight: 1,
    fillOpacity: 0.5,
  };

  export const geoJsonStyleOthers = {
    fillColor: "yellow",
    color: "black",
    weight: 1,
    fillOpacity: 0.5,
  };

  export const geoJsonStyleRepublican = {
    fillColor: "Red",
    color: "black",
    weight: 1,
    fillOpacity: 0.5,
  };

  export const geoJsonStyleDemocrats = {
    fillColor: "Blue",
    color: "black",
    weight: 1,
    fillOpacity: 0.5,
  };
