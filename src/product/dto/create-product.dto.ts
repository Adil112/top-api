import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantage: string;

	@IsString()
	disAdvantage: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@ValidateNested()
	@IsArray()
	@Type(() => ProductCharacteristicDto)
	characteristics: ProductCharacteristicDto[];
}

class ProductCharacteristicDto {
	@IsString()
	name: string;

	@IsString()
	value: string;
}