import { Global, Module } from '@nestjs/common';
import { JobsEnsemblVepService } from './services/jobs.ensembl-vep.service';
import { JobsEnsemblVepController } from './controllers/jobs.ensembl-vep.controller';
import { QueueModule } from '../jobqueue/queue.module';
import { JobsEnsemblVepNoauthController } from './controllers/jobs.ensembl-vep.noauth.controller';

@Global()
@Module({
  imports: [QueueModule],
  controllers: [JobsEnsemblVepController, JobsEnsemblVepNoauthController],
  providers: [JobsEnsemblVepService],
  exports: [],
})
export class JobsModule {}
