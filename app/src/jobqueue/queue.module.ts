import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { createWorkers } from '../workers/ensembl-vep.main';
import { EnsemblVepJobQueue } from './queue/ensemblvep.queue';
import { NatsModule } from '../nats/nats.module';
import { JobCompletedPublisher } from '../nats/publishers/job-completed-publisher';

@Module({
  imports: [NatsModule],
  providers: [EnsemblVepJobQueue],
  exports: [EnsemblVepJobQueue],
})
export class QueueModule implements OnModuleInit {
  @Inject(JobCompletedPublisher) jobCompletedPublisher: JobCompletedPublisher;
  async onModuleInit() {
    await createWorkers(this.jobCompletedPublisher);
  }
}
