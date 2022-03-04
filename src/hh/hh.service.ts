import { HttpService } from '@nestjs/axios';
import { HttpServer, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HhResponse } from './hh.models';

@Injectable()
export class HhService {

	token: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.token = this.configService.get('HH_TOKEN') ?? '';
	}

	async getData(text: string) {

		try {
			const hhResponse = this.httpService.get('http://api.hh.ru/vacancies', {
				params: {
					text,
					cluster: true
				},
				headers: {
					'User-Agent': 'VacTop/1.0 (adil.200191@gmail.com)',
					Authorization: 'Bearer ' + this.token
				}
			});
			//return this.parseData(hhResponse);
		}
		catch (e) {
			Logger.error(e);
		}
	}

	private parseData(hhResponse: HhResponse): HhData {
		const salaryCluster = hhResponse.clusters.find(c => c.id == 'salary');
		if (!salaryCluster) {
			throw new Error('Не найден кластер Salary');
		}

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[0].name);
		const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name);
		const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name);

		return {
			count: hhResponse.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date()
		}
	}

	private getSalaryFromString(s: string): number {
		const numberRegExp = /(\d+)/g;
		const res = s.match(numberRegExp);
		if (!res) {
			return 0;
		}
		return Number(res[0]);
	}
}
