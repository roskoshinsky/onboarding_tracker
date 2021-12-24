export const randomInt = ( min = 0, max = 0 ): number => Math.abs( min ) +
	Math.round(
	    Math.random() * ( Math.abs( max ) - Math.abs( min ) ),
	);
