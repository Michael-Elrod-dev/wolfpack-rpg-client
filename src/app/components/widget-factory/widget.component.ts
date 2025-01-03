import { ConfigManager } from 'src/app/services/data/config-manager';
import { CommandService } from 'src/app/services/command/command-service';
import { MatRipple } from '@angular/material/core';
import { EventSubService } from 'src/app/services/eventsub/eventsub.service';

/**
 * Interface all widgets implement to receive access to app services.
 */
export interface WidgetComponent {
  /**
   * EventSub service used to receive whisper events.
   */
  eventSubService: EventSubService | undefined;
  /**
   * Config manager used to save & load user config data.
   */
  configManager: ConfigManager | undefined;
  /**
   * Command service used to send commands and listen for their responses.
   */
  commandService: CommandService | undefined;
  /**
   * The name of the component.
   */
  name: string;

  onActivate(): void;
}
