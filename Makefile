tag=dev
platform=linux/amd64
docker-repository=274199647570.dkr.ecr.us-east-1.amazonaws.com/kargo-kursor
docker-image := $(docker-repository):$(tag)

.PHONY: docker-build docker-push

docker-build: 
	docker build \
		--platform $(platform) \
		--tag $(docker-image) \
		.

docker-push: docker-build
	docker push $(docker-image)

deploy-staging:
	kubectl --context green-staging -n kargo-kursor apply -k k8s/kustomize/base
