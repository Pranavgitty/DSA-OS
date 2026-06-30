import { TFile } from "obsidian";
import DSAOSPlugin from "../main";

export interface PlannerSession {
	date: string;
	dailyTarget: number;
	todaysPlan: string[];
	carryOver: string[];
}

export class SessionService {
	private session!: PlannerSession;

	constructor(private plugin: DSAOSPlugin) {}

	private createDefaultSession(): PlannerSession {
		return {
			date: "",
			dailyTarget: 5,
			todaysPlan: [],
			carryOver: [],
		};
	}

	async initialize(): Promise<void> {
		const data = await this.plugin.loadData();

		if (
			!data ||
			typeof data !== "object" ||
			!("session" in data) ||
			!data.session
		) {
			this.session = this.createDefaultSession();
			await this.save();
			return;
		}

		const session = data.session as Partial<PlannerSession>;

		this.session = {
			date:
				typeof session.date === "string"
					? session.date
					: "",
			dailyTarget:
				typeof session.dailyTarget === "number"
					? Math.max(1, session.dailyTarget)
					: 5,
			todaysPlan: Array.isArray(session.todaysPlan)
				? [...session.todaysPlan]
				: [],
			carryOver: Array.isArray(session.carryOver)
				? [...session.carryOver]
				: [],
		};
	}

	async save(): Promise<void> {
		await this.plugin.saveData({
			session: this.session,
		});
	}

	getSession(): PlannerSession {
		return structuredClone(this.session);
	}

	async setSession(
		session: PlannerSession
	): Promise<void> {
		this.session = structuredClone(session);
		await this.save();
	}

	async resetSession(): Promise<void> {
		this.session = this.createDefaultSession();
		await this.save();
	}

	getDate(): string {
		return this.session.date;
	}

	async setDate(date: string): Promise<void> {
		this.session.date = date;
		await this.save();
	}

	getDailyTarget(): number {
		return this.session.dailyTarget;
	}

	async setDailyTarget(
		target: number
	): Promise<void> {
		this.session.dailyTarget = Math.max(1, target);
		await this.save();
	}

	getTodaysPlanIds(): string[] {
		return [...this.session.todaysPlan];
	}

	async setTodaysPlanIds(
		ids: string[]
	): Promise<void> {
		this.session.todaysPlan = [...ids];
		await this.save();
	}

	getCarryOverIds(): string[] {
		return [...this.session.carryOver];
	}

	async setCarryOverIds(
		ids: string[]
	): Promise<void> {
		this.session.carryOver = [...ids];
		await this.save();
	}

	async startNewSession(
		date: string,
		problems: string[],
		carryOver: string[]
	): Promise<void> {
		this.session = {
			date,
			dailyTarget: this.session.dailyTarget,
			todaysPlan: [...problems],
			carryOver: [...carryOver],
		};

		await this.save();
	}

	resolveFiles(files: TFile[]): TFile[] {
		const fileMap = new Map<string, TFile>();

		for (const file of files) {
			const cache =
				this.plugin.app.metadataCache.getFileCache(file);

			const id = cache?.frontmatter?.id;

			if (id !== undefined && id !== null) {
				fileMap.set(String(id), file);
			}
		}

		return this.session.todaysPlan
			.map((id) => fileMap.get(id))
			.filter(
				(file): file is TFile => file !== undefined
			);
	}
}