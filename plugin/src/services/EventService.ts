export class EventService {

	private static listeners = new Map<
		string,
		Set<() => void>
	>();

	static on(event: string, callback: () => void) {

		if (!this.listeners.has(event)) {

			this.listeners.set(event, new Set());

		}

		this.listeners.get(event)!.add(callback);

	}

	static off(event: string, callback: () => void) {

		this.listeners.get(event)?.delete(callback);

	}

	static emit(event: string) {

		for (const callback of this.listeners.get(event) ?? []) {

			callback();

		}

	}

}
